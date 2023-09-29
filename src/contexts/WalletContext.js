import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InstallExtension from '../components/modals/InstallExtension';
import { NETWORK_PARAMS } from '../constants';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const { ethereum } = window;

  const switchNetwork = async () => {
    if (ethereum.chainId != NETWORK_PARAMS.arbitrum.chainId) {
      await ethereum.request({ method: 'wallet_addEthereumChain', params: [NETWORK_PARAMS.arbitrum] });
    }
  };

  const fetchAddress = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(accounts[0]);
  };

  useEffect(() => {
    if (ethereum) {
      switchNetwork();
      fetchAddress();

      const handleAccountsChanged = (accounts) => {
        setAddress(accounts[0]);
      };

      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address }}>
      {children}
      {ethereum ? null : <InstallExtension/>}
    </WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
