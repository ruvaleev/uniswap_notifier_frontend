import React from 'react';

import { useLocation } from 'react-router-dom';
import { rootPath, settingsPath } from '__helpers/routes';

import Logo from './Logo';
import MainPageLink from '__components/buttons/MainPageLink';
import SettingsLink from '__components/buttons/SettingsLink';
import ConnectButton from '__components/buttons/ConnectButton';
import TelegramButton from '__components/buttons/TelegramButton';


const Links = () => {
  const location = useLocation();
  const links = {
    [rootPath()]: <MainPageLink key='MainPageLink'/>,
    [settingsPath()]: <SettingsLink key='SettingsLink'/>
  }

  // eslint-disable-next-line no-unused-vars
  const { [location.pathname]: _, ...result } = links;

  return <>{Object.values(result)}</>
}

const ControlPanel = () => {
  return (
    <div className='flex items-center justify-end p-6 right-4'>
      <Logo/>
      <Links/>
      <TelegramButton/>
      <ConnectButton/>
    </div>
  )
};

export default ControlPanel;
