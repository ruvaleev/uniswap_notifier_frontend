import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import App from '../src/App';
import { NETWORK_PARAMS } from '__constants';

describe('when Metamask extension is not installed', () => {
  it('suggests to install Metamask', () => {
    render(<App />);
    const metamaskLink = screen.getByText('MetaMask')
    expect(metamaskLink).toBeInTheDocument();
    expect(metamaskLink).toHaveAttribute('href', 'https://metamask.io/download');
  })
});

describe('when Metamask extension is installed', () => {
  const ethereumRequestMock = jest.fn().mockImplementation(() => {
    return Promise.resolve(['0x1234567890']);
  })
  beforeEach(() => {
    global.window.ethereum = {
      on: jest.fn(),
      removeListener: jest.fn(),
      request: ethereumRequestMock,
      chainId: '0xa4b1',
    };
  });

  afterAll(() => {
    delete global.window.ethereum;
  });

  describe('when no crypto wallet is connected', () => {
    it('suggests connect to crypto wallet', async () => {
      render(<App />);
      await waitFor(() => {
        expect(ethereumRequestMock.mock.calls).toEqual([[{method: 'eth_requestAccounts'}]]);
        const textElement = screen.getByText('0x1234567890');
        expect(textElement).toBeInTheDocument();
      });
    })
  });

  describe('when crypto wallet connected, but with wrong network', () => {
    beforeEach(() => {
      ethereumRequestMock.mock.calls = [];
      global.window.ethereum.chainId = '0xa';
    });

    it('suggests to switch to Arbitrum network', async () => {
      render(<App />);
      await waitFor(() => {
        expect(ethereumRequestMock.mock.calls[0]).toEqual([
          {method: 'wallet_addEthereumChain', params: [NETWORK_PARAMS.arbitrum]}
        ]);
      });
    })
  });

});

describe('when crypto wallet connected with correct network', () => {
  describe('when Telegram not connected', () => {
    xit('renders button to connect Telegram', () => {})
  })

  describe('when Telegram connected', () => {
    xit('renders button to disconnect Telegram', () => {})
  })
});
