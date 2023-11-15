import React from 'react';
import { render, screen } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import FinalResult from '__components/Position/FinalResult';

const renderComponent = (position) => {
  render(
    <FinalResult position={position} />
  );
};

describe('FinalResult', () => {
  const position = fulfilledPosition

  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('01.01.2024'));
  })

  it('renders proper info about final preformance considering IL, claimed and unclaimed fees', () => {
    renderComponent(position)

    // Total Profit in Fees (USD)
    expect(screen.getByText('$1327.32')).toBeInTheDocument();
    // Total Profit in Fees (Tokens)
    expect(screen.getByText('0.370486780861439807')).toBeInTheDocument(); // WETH
    expect(screen.getByText('692.843336635293279432')).toBeInTheDocument(); // ARB
    // Total Profit in Fees % (by USD)
    expect(screen.getByText('5.4623%')).toBeInTheDocument();
    // Total APR in Fees %
    expect(screen.getByText('37.6179%')).toBeInTheDocument();
    // Total Profit Considering IL
    expect(screen.getByText('$404.12')).toBeInTheDocument();
  })
});
