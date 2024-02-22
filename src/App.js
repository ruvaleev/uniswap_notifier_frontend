import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from '__src/routes';
import { WalletProvider } from './contexts/WalletContext';
import createStore from '__redux/store';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
  enabled: process.env.ROLLBAR_ENABLED === 'true'
};

const store = createStore();

function App() {
  return (
    <Provider config={rollbarConfig} store={store}>
      <ErrorBoundary>
        <WalletProvider>
          <BrowserRouter >
            <Routes>
              {routes.map((route) => (
                <Route key={route.name} {...route} />
              ))}
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
