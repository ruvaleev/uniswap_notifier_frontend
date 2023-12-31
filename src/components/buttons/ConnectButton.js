import React, { useContext } from 'react';

import { WalletContext } from '__contexts/WalletContext';
import Wallet from '__assets/icons/Wallet';
import Button from './Button';

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
      <Button callback={fetchAddress} classNames='bg-green border-green flex items-center justify-around text-black'>
        <span className='mr-2'>
          <Wallet/>
        </span>
        {address ? maskedAddress(address) : 'Connect Wallet'}
      </Button>
    </div>
  );
};

export default ConnectButton;
