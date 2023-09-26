import React from 'react';

import './styles.css';

function InstallExtension() {
  // console.log(styles)
  return (
    <div className="modal">
      <div className="modal-content">
        <p>To continue please install one of the wallet browser extensions below:</p>
        <a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer">MetaMask</a>
      </div>
    </div>
  );
}

export default InstallExtension;
