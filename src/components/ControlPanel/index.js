import React from 'react';

import Logo from './Logo';
import SettingsLink from '__components/buttons/SettingsLink';
import ConnectButton from '__components/buttons/ConnectButton';
import TelegramButton from '__components/buttons/TelegramButton';

const ControlPanel = () => (
  <div className='flex items-center justify-end p-6 right-4'>
    <Logo/>
    <SettingsLink/>
    <TelegramButton/>
    <ConnectButton/>
  </div>
);

export default ControlPanel;
