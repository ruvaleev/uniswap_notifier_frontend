import React from 'react';

import './styles.css';

function InstallExtension() {
  return (
    <div className="modal">
      <div className="absolute grid-container flex flex-col modal-content p-4 text-base text-center">
        <p>To continue please install one of the wallet browser extensions below:</p>
        <a href="https://metamask.io/download" target="_blank" rel="noopener noreferrer" className='primary'>
          MetaMask
        </a>
      </div>
    </div>
  );
}

export default InstallExtension;
