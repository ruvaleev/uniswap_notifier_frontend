import React from 'react';

import { WalletProvider } from './contexts/WalletContext';
import Main from './pages/Main';

function App() {
  return (
    <WalletProvider>
      <Main/>
    </WalletProvider>
  );
}

export default App;
