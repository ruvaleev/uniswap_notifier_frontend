import React from 'react';
import { render, screen } from '@testing-library/react';

import LiquidityChanges from '__components/Position/LiquidityChanges';

const renderComponent = (increases, decreases) => {
  render(
    <LiquidityChanges increases={increases} decreases={decreases}/>
  );
};

describe('LiquidityChanges', () => {
  const increases = [
    {
      liquidity: "7108218528222899361894",
      amount0: "0.028400052060967359",
      amount1: "39044.924814345658556843",
      blockNumber: 132099846,
      timestamp: 1695009234,
    },
    {
      liquidity: "3554109264111449680947",
      amount0: "0.023347648059209943",
      amount1: "19504.10771635450461526",
      blockNumber: 143631173,
      timestamp: 1698175160,
    },
    {
      liquidity: "3554109264111449680947",
      amount0: "0.023347648059209943",
      amount1: "19504.10771635450461526",
      blockNumber: 143631174,
      timestamp: 1698175161,
    }
  ]
  const decreases = [
    {
      liquidity: "3554109264111449680947",
      amount0: "0.023347648059209943",
      amount1: "19504.10771635450461526",
      blockNumber: 143631172,
      timestamp: 1698175159,
    },
    {
      liquidity: "2665581948083587260710",
      amount0: "0.023347648059209943",
      amount1: "19504.10771635450461526",
      blockNumber: 143631175,
      timestamp: 1698175162,
    }
  ]

  it('renders proper liquidity changes history', () => {
    renderComponent(increases, decreases)

    expect(screen.getByText('-50%')).toBeInTheDocument();
    expect(screen.getByText('+100%')).toBeInTheDocument();
    expect(screen.getByText('+50%')).toBeInTheDocument();
    expect(screen.getByText('-25%')).toBeInTheDocument();
  })
});
