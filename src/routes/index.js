import React from 'react';

import { rootPath, settingsPath } from '__helpers/routes';
import Main from '__src/pages/Main';
import Settings from '__src/pages/Settings';
import NotFound from '__src/pages/NotFound';

export default [
  {
    name: 'main',
    path: rootPath(),
    element: <Main />,
  },
  {
    name: 'settings',
    path: settingsPath(),
    element: <Settings />,
  },
  {
    name: 'notFound',
    path: '*',
    element: <NotFound />,
  },
];
