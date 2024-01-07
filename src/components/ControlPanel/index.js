import React from 'react';

import Logo from './Logo';
import ConnectButton from '__components/buttons/ConnectButton';
import TelegramButton from '__components/buttons/TelegramButton';

const ControlPanel = () => (
  // <div className='absolute flex items-center right-4'>
  <div className='flex items-center justify-end p-6 right-4'>
    <Logo/>
    <TelegramButton/>
    <ConnectButton/>
  </div>
);

export default ControlPanel;
