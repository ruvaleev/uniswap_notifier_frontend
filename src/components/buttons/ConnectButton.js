import React, { useContext } from 'react';
import { WalletContext } from '../../contexts/WalletContext';

const ConnectButton = () => {
  const { address } = useContext(WalletContext);
  return <div>{address}</div>;
};

export default ConnectButton;
