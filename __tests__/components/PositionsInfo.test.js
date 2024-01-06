import React from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';

import PositionsInfo from '__components/PositionsInfo';
import { WalletProvider } from '__contexts/WalletContext';
import { ethereumMock } from '__mocks/ethereumMock';
import poolFixture from '__mocks/fixtures/pools/response200success.json';
import positionsFixture from '__mocks/fixtures/positions/response200success.json';
import pricesFixture from '__mocks/fixtures/prices/success.json';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => pricesFixture,
  status: 200,
  ok: true
}));

jest.mock('__services/getHistoricalPrice', () => {
  const { getHistoricalPriceMock } = require('__mocks/services/getHistoricalPriceMock')

  return getHistoricalPriceMock();
});

function mockFetchPool() {
  return jest.fn(() => Promise.resolve(poolFixture.data.pools[0]));
}

jest.mock('__services/graph/fetchPool', () => mockFetchPool());

function mockFetchPositions() {
  return jest.fn(() => Promise.resolve(positionsFixture.data.positions));
}

jest.mock('__services/graph/fetchPositions', () => mockFetchPositions());

import fetchPositions from '__services/graph/fetchPositions';

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  const { poolMock } = require('__mocks/poolMock')
  const { positionsManagerMock } = require('__mocks/positionsManagerMock')
  const { rpcProviderMock } = require('__mocks/rpcProviderMock')
  const { POSITION_MANAGER_CONTRACT } = require('__constants');

  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation((address) => (
        address === POSITION_MANAGER_CONTRACT ? positionsManagerMock() : poolMock({ address })
      )),
      JsonRpcProvider: jest.fn().mockImplementation(() => rpcProviderMock()),
    }
  };
});

const renderWithProvider = async () => {
  return await act(async () => (
    render(
      <WalletProvider>
        <PositionsInfo />
      </WalletProvider>
    )
  ));
};

describe('PositionsInfo', () => {
  describe('when WalletContext has no address', () => {
    beforeEach(async () => {
      ethereumMock()
      await renderWithProvider()
    });

    it("doesn't call fetchPositions service", () => {
      expect(fetchPositions).not.toHaveBeenCalled()
    });
  });

  describe('when WalletContext has address', () => {
    const mockAddress = '0x08786a247d4b9ff489fa4f599f74ac1228786a24'

    beforeEach(async () => {
      ethereumMock({addresses: [mockAddress]})
      await renderWithProvider()
    });

    it('calls fetchPositions service', async () => {
      await waitFor(() => expect(fetchPositions).toHaveBeenCalledWith(mockAddress));
    });

    describe('when fetchPositions service returns successfull response', () => {
      it('shows received info on the page', async () => {
        positionsFixture.data.positions.forEach((position) => {
          expect(screen.getByText(position.id)).toBeInTheDocument();
        })

        await waitFor(() => {
          const dashboard = screen.getByTestId('dashboard')
          const withinDasboard = within(dashboard)
          // Dashboard Summary
          expect(withinDasboard.getByText('$1839.32')).toBeInTheDocument(); // Total Unclaimed Fees
          expect(withinDasboard.getByText('$919.32')).toBeInTheDocument(); // Total Claimed Fees
          expect(withinDasboard.getByText('$2758.64')).toBeInTheDocument(); // Total Fees Earned (Claimed + Unclaimed)
          // Common Info
          expect(screen.getByText('$38363.53')).toBeInTheDocument();
          expect(screen.getByText('$0.920302')).toBeInTheDocument();
          expect(screen.getByText('$0.998581')).toBeInTheDocument();
          expect(screen.getByText('$1699.14')).toBeInTheDocument();
        });
      })
    })
  });
})
