import React from 'react';
import { render, screen } from '@testing-library/react';

import ImpermanentLossInfo from '__components/Position/ImpermanentLossInfo';
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';

const renderComponent = (position) => {
  render(
    <ImpermanentLossInfo position={position}/>
  );
};

describe('ImpermanentLossInfo', () => {
  describe('when position is fulfilled already', () => {
    beforeEach(() => {
      renderComponent(fulfilledPosition)
    })

    it('renders proper IL statistics', () => {
      // Initial position proportion:
      expect(screen.getByText('0.02840005')).toBeInTheDocument(); // WETH
      expect(screen.getByText('39044.92481435')).toBeInTheDocument(); // ARB
      expect(screen.getByText('$31768.83')).toBeInTheDocument(); // Initial position cost

      // Liquidity changes:
      expect(screen.getByText('-50%')).toBeInTheDocument();

      // With hold strategy current USD amounts would be:
      expect(screen.getByText('$26.85')).toBeInTheDocument(); // WETH
      expect(screen.getByText('$21396.62')).toBeInTheDocument(); // ARB
      expect(screen.getByText('$21423.47')).toBeInTheDocument(); // Total value HODL

      // Result:
      expect(screen.getByText('$923.20')).toBeInTheDocument(); // Impermanent Loss USD
    })
  });
});
