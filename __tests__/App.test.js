import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import App from '__src/App';
import { NETWORK_PARAMS } from '__constants';
import positionsFixture from '__mocks/fixtures/positions/response200success.json';
import pricesFixture from '__mocks/fixtures/prices/success.json';
import { ethereumMock } from '__mocks/ethereumMock';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => pricesFixture,
  status: 200,
  ok: true
}));

function mockFetchPositions() {
  return jest.fn(() => Promise.resolve(positionsFixture.data.positions));
}

jest.mock('__services/graph/fetchPositions', () => mockFetchPositions());

jest.mock('__services/buildPosition', () => {
  const { buildPositionMock } = require('__mocks/services/buildPositionMock')

  return buildPositionMock();
});

describe('when Metamask extension is not installed', () => {
  beforeAll(() => {
    delete global.window.ethereum;
  })

  it('suggests to install Metamask', async () => {
    await act(async () => {
      render(<App />);
    })
    const metamaskLink = screen.getByText('MetaMask')
    expect(metamaskLink).toBeInTheDocument();
    expect(metamaskLink).toHaveAttribute('href', 'https://metamask.io/download');
    const positionsList = screen.queryByTestId('positions-list');
    expect(positionsList).toBeNull();
  })
});

describe('when Metamask extension is installed', () => {
  let ethereum;

  beforeAll(() => {
    ethereum = ethereumMock({ addresses: ['0x1234567890'] })
  })

  afterAll(() => {
    delete global.window.ethereum;
  });

  describe('when no crypto wallet is connected', () => {
    it('suggests connect to crypto wallet and renders connected wallet information', async () => {
      render(<App />);
      await waitFor(() => {
        expect(ethereum.mock.calls[1]).toEqual([{method: 'eth_requestAccounts'}]);
        const textElement = screen.getByText('0x1234...7890');
        expect(textElement).toBeInTheDocument();
        const positionsList = screen.getByTestId('positions-list');
        expect(positionsList).toBeInTheDocument();
      });
    })
  });

  describe('when crypto wallet connected, but with wrong network', () => {
    const ethereumRequestMock = jest.fn().mockImplementation(({ method }) => {
      if (method === 'eth_chainId') {
        return '0xa'
      } else {
        return Promise.resolve(['0x1234567890']);
      }
    })

    beforeEach(() => {
      global.window.ethereum.request = ethereumRequestMock
    });

    it('suggests to switch to Arbitrum network', async () => {
      render(<App />);
      await waitFor(() => {
        expect(ethereumRequestMock.mock.calls[2]).toEqual([
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
