import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

import { WalletProvider } from './contexts/WalletContext';
import Main from './pages/Main';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
  environment: process.env.NODE_ENV,
  enabled: process.env.ROLLBAR_ENABLED === 'true'
};

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <WalletProvider>
          <Main/>
        </WalletProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
