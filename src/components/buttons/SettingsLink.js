import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';

const SettingsLink = () => {
  return (
    <Button callback={() => {}} classNames='border-green text-green mr-1'>
      <Link to="/settings">Settings</Link>
    </Button>
  );
};

export default SettingsLink;
