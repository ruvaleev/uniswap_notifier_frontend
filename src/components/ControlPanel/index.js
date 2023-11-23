import React from 'react';

import ConnectButton from '__components/buttons/ConnectButton';
import TelegramButton from '__components/buttons/TelegramButton';

const ControlPanel = () => (
  <div className='absolute flex items-center right-4'>
    <TelegramButton/>
    <ConnectButton/>
  </div>
);

export default ControlPanel;
