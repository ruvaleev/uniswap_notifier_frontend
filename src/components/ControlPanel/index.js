import React from 'react';

import Logo from './Logo';
import ConnectButton from '__components/buttons/ConnectButton';
import TelegramButton from '__components/buttons/TelegramButton';
import ContactUsButton from '__components/buttons/ContactUsButton';

const ControlPanel = () => (
  <div className='flex items-center justify-end p-6 right-4'>
    <Logo/>
    <ContactUsButton/>
    <TelegramButton/>
    <ConnectButton/>
  </div>
);

export default ControlPanel;
