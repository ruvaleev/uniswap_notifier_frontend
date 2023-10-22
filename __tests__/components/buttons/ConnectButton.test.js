import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { WalletProvider } from '__contexts/WalletContext';
import { ethereumMock } from '__mocks/ethereumMock';

import ConnectButton from '__components/buttons/ConnectButton';

const renderWithProvider = async () => {
  await act(async () => {
    render(
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>
    );
  });
};

describe('ConnectButton', () => {
  describe('when wallet is not connected yet', () => {
    beforeEach(async () => {
      ethereumMock()
      await renderWithProvider()
    });

    it('suggests to connect a wallet', () => {
      expect(screen.getByText(/Connect wallet/i)).toBeInTheDocument();
    })
  });

  describe('when wallet is already connected', () => {
    const mockAddress = '0x08786a247d4b9ff489fa4f599f74ac1228786a24'

    beforeEach(async () => {
      ethereumMock({addresses: [mockAddress]})
      await renderWithProvider()
    });

    it('shows masked wallet address', () => {
      expect(screen.getByText(/0x0878...6a24/i)).toBeInTheDocument();
    })
  });
});
