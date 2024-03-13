import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import { settingsPath } from '__helpers/routes';

const SettingsLink = () => {
  return (
    <Button callback={() => {}} classNames='border-green text-green mr-1'>
      <Link to={settingsPath()}>Settings</Link>
    </Button>
  );
};

export default SettingsLink;
