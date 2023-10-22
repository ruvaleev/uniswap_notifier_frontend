import React, { useContext } from 'react';

import './styles.css';
import { WalletContext } from '../../contexts/WalletContext';

const maskedAddress = (address) => {
  if (!address) { return '' }

  const first6 = address.substr(0, 6);
  const last4 = address.substr(address.length - 4);

  return `${first6}...${last4}`;
}

const ConnectButton = () => {
  const { address } = useContext(WalletContext);
  const { ethereum } = window;

  const fetchAddress = async () => {
    await ethereum.request({ method: 'eth_requestAccounts' });
  };

  return (
    <div className='relative'>
      <button className="connect-button rounded-xl text-base text-center" onClick={fetchAddress}>
        {address ? maskedAddress(address) : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectButton;
