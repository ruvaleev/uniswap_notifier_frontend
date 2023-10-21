import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import PositionsInfo from '__components/PositionsInfo';
import { WalletProvider } from '__contexts/WalletContext';
import { ethereumMock } from '__mocks/ethereumMock';
import positionsFixture from '__mocks/fixtures/positions/response200success.json';
import pricesFixture from '__mocks/fixtures/prices/success.json';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => pricesFixture,
  status: 200,
  ok: true
}));

function mockFetchPositions() {
  return jest.fn(() => Promise.resolve(positionsFixture.data.positions));
}

jest.mock('__services/graph/fetchPositions', () => mockFetchPositions());

import fetchPositions from '__services/graph/fetchPositions';

import { poolMock } from '__mocks/poolMock';

const mockPoolContract = () => poolMock();

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation(() => mockPoolContract())
    }
  };
});

const renderWithProvider = async () => {
  await act(async () => {
    render(
      <WalletProvider>
        <PositionsInfo />
      </WalletProvider>
    );
  });
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

    it('renders proper message', () => {
      expect(screen.getByText(/Connect wallet/i)).toBeInTheDocument();
    })
  });

  describe('when WalletContext has address', () => {
    const mockAddress = 'address'

    beforeEach(async () => {
      ethereumMock({addresses: [mockAddress]})
      await renderWithProvider()
    });

    it('calls fetchPositions service', async () => {
      await waitFor(() => expect(fetchPositions).toHaveBeenCalledWith(mockAddress));
    });

    describe('when fetchPositions service returns successfull response', () => {
      it('shows received info on the page', () => {
        positionsFixture.data.positions.forEach((position) => {
          expect(screen.getByText(position.id)).toBeInTheDocument();
        })

        expect(screen.getByText('Total Portfolio Value: $38363.53')).toBeInTheDocument();
        expect(screen.getByText('Total Fees: $2226027789375424200000000000000000000000000.00')).toBeInTheDocument();
        expect(screen.getByText('ARB: $0.920302')).toBeInTheDocument();
        expect(screen.getByText('USDC: $0.998581')).toBeInTheDocument();
        expect(screen.getByText('WETH: $1699.14')).toBeInTheDocument();
      })
    })

    describe('when fetchPositions service returns error', () => {
      beforeEach(async () => {
        fetchPositions.mockImplementation(() => Promise.resolve({errors: ['some error']}));
        await renderWithProvider()
      });

      it('shows received error', () => {
        expect(screen.getByText(/some error/i)).toBeInTheDocument();
      });
    })
  });
})
