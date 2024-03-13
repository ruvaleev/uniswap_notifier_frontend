import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import { rootPath } from '__helpers/routes';

const MainPageLink = () => {
  return (
    <Button callback={() => {}} classNames='border-green text-green mr-1'>
      <Link to={rootPath()}>Main Page</Link>
    </Button>
  );
};

export default MainPageLink;
