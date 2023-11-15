import React from 'react';
import { render, screen } from '@testing-library/react';

import LiquidityChanges from '__components/Position/LiquidityChanges';

const renderComponent = (changes) => {
  render(
    <LiquidityChanges changes={changes}/>
  );
};

describe('LiquidityChanges', () => {
  const changes = {
    '1698175159': '-50',
    '1698175160': '100',
    '1698175161': '50',
    '1698175162': '-25',
  }

  it('renders proper liquidity changes history', () => {
    renderComponent(changes)

    expect(screen.getByText('-50%')).toBeInTheDocument();
    expect(screen.getByText('+100%')).toBeInTheDocument();
    expect(screen.getByText('+50%')).toBeInTheDocument();
    expect(screen.getByText('-25%')).toBeInTheDocument();
  })
});
