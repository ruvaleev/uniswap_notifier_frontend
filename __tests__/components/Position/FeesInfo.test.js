import React from 'react';
import { render, screen } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import FeesInfo from '__components/Position/FeesInfo';

const renderComponent = (token0, token1, feesClaims) => {
  render(
    <FeesInfo token0={token0} token1={token1} feesClaims={feesClaims} />
  );
};

describe('FeesInfo', () => {
  const { token0, token1, feesClaims } = fulfilledPosition

  it('renders proper info about claimed and unclaimed fees', () => {
    renderComponent(token0, token1, feesClaims)

    // WETH Unclaimed Fees
    expect(screen.getByText('0.105978455624063704')).toBeInTheDocument();
    expect(screen.getByText('($200.41)')).toBeInTheDocument();
    // ARB Unclaimed Fees
    expect(screen.getByText('189.402873985428375334')).toBeInTheDocument();
    expect(screen.getByText('($207.59)')).toBeInTheDocument();
    // Total Unclaimed Fees
    expect(screen.getByText('$408.00')).toBeInTheDocument();

    // WETH Claimed Fees
    expect(screen.getByText('0.113170575274402416')).toBeInTheDocument();
    expect(screen.getByText('($181.07)')).toBeInTheDocument();
    expect(screen.getByText('0.151337749962973687')).toBeInTheDocument();
    expect(screen.getByText('($249.71)')).toBeInTheDocument();

    // ARB Claimed Fees
    expect(screen.getByText('205.450158813346474497')).toBeInTheDocument();
    expect(screen.getByText('($205.45)')).toBeInTheDocument();
    expect(screen.getByText('297.990303836518429601')).toBeInTheDocument();
    expect(screen.getByText('($283.09)')).toBeInTheDocument();
  })
});
