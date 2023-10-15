import React from 'react';
import PropTypes from 'prop-types';

import getTokenAmounts from '__services/getTokenAmounts';
import FeesInfo from './FeesInfo';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';

const Position = ({position}) => {
  const { price0, price1 } = sqrtPriceToReadablePrices(
    position.pool.sqrtPrice,
    position.token0.decimals,
    position.token1.decimals,
  );
  const token0 = position.token0.symbol
  const token1 = position.token1.symbol
  const { amount0, amount1 } = getTokenAmounts(
    position.liquidity,
    position.pool.sqrtPrice,
    position.tickLower,
    position.tickUpper,
    position.token0.decimals,
    position.token1.decimals
  )

  return (
    <div className="grid-container">
      <div className="grid-item">{position.id}</div>
      <div className="grid-item">1 {token0} costs {price0} of {token1}</div>
      <div className="grid-item">1 {token1} costs {price1} of {token0}</div>
      <div className="grid-item">Position has:</div>
      <div className="grid-item">{amount0} of {token0}</div>
      <div className="grid-item">{amount1} of {token1}</div>
      <FeesInfo position={position}/>
    </div>
  )
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired
}
