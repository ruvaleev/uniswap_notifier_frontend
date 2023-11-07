import React from 'react';
import { render, screen } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import FeesInfo from '__components/PositionsInfo/FeesInfo';

const renderComponent = (token0, token1, collects, liquidityDecreases) => {
  render(
    <FeesInfo token0={token0} token1={token1} collects={collects} liquidityDecreases={liquidityDecreases} />
  );
};

describe('FeesInfo', () => {
  const { token0, token1, events } = fulfilledPosition
  const liquidityDecreases = [
    {
      liquidity: "1777054632055724840473",
      amount0: "0.011673824029604971",
      amount1: "9752.053858177253",
      blockNumber: 143631172,
      timestamp: 1698175159,
    },
    {
      liquidity: "1777054632055724840474",
      amount0: "0.011673824029604972",
      amount1: "9752.053858177253",
      blockNumber: 143631172,
      timestamp: 1698175159,
    }
  ]

  it('renders proper info about claimed and unclaimed fees', () => {
    renderComponent(token0, token1, events.collects, liquidityDecreases)

    // WETH Unclaimed Fees
    expect(screen.getByText('0.105978455624063704')).toBeInTheDocument();
    expect(screen.getByText('($200.41)')).toBeInTheDocument();
    // ARB Unclaimed Fees
    expect(screen.getByText('189.402873985428375334')).toBeInTheDocument();
    expect(screen.getByText('($207.59)')).toBeInTheDocument();
    // Total Unclaimed Fees
    expect(screen.getByText('($408.00)')).toBeInTheDocument();

    // WETH Claimed Fees
    expect(screen.getByText('0.113170575274402416')).toBeInTheDocument();
    expect(screen.getByText('0.151337749962973687')).toBeInTheDocument();

    // ARB Claimed Fees
    expect(screen.getByText('205.450158813346474497')).toBeInTheDocument();
    expect(screen.getByText('297.990303836517044861')).toBeInTheDocument();
  })
});
