import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import ProportionsInfo from '__components/Position/ProportionsInfo';

const renderComponent = (token0, token1) => {
  render(
    <ProportionsInfo t0={token0} t1={token1}/>
  );
};

describe('ProportionsInfo', () => {
  const { token0, token1 } = fulfilledPosition
  let tokenLabel;

  it('renders proper info about current coins proportions in the position and allows to switch currency', () => {
    renderComponent(token0, token1)

    tokenLabel = screen.getByTestId('tokenLabel')
    expect(tokenLabel.textContent).toEqual('WETH')
    expect(screen.getByText('1724.839538208308673783')).toBeInTheDocument(); // price
    expect(screen.getByText('1544.773960081565292057')).toBeInTheDocument(); // minPrice
    expect(screen.getByText('2007.448467185575736949')).toBeInTheDocument(); // maxPrice

    const component = screen.getByTestId('proportionsInfo')
    fireEvent.click(component);

    tokenLabel = screen.getByTestId('tokenLabel')
    expect(tokenLabel.textContent).toEqual('ARB')
    expect(screen.getByText('0.000579764075352052')).toBeInTheDocument(); // price
    expect(screen.getByText('0.000647343900040365')).toBeInTheDocument(); // minPrice
    expect(screen.getByText('0.000498144792429960')).toBeInTheDocument(); // maxPrice
  })
});
