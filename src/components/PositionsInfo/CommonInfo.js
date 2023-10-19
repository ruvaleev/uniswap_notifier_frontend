import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const CommonInfo = ({ id, token0, token1, amount0, amount1, price0, price1, usdAmount0, usdAmount1 }) => {
  const totalValue = usdAmount0 + usdAmount1
  return (
    <>
      <div className="grid-item">{id}</div>
      <div className="grid-item">1 {token0} costs {price1} of {token1}</div>
      <div className="grid-item">1 {token1} costs {price0} of {token0}</div>
      <div className="grid-item">Position has:</div>
      <div className="grid-item">{amount0} of {token0} ({moneyFormat(usdAmount0)})</div>
      <div className="grid-item">{amount1} of {token1} ({moneyFormat(usdAmount1)})</div>
      <div className="grid-item">Total value: {moneyFormat(totalValue)}</div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  id: PropTypes.string.isRequired,
  token0: PropTypes.string.isRequired,
  token1: PropTypes.string.isRequired,
  amount0: PropTypes.number.isRequired,
  amount1: PropTypes.number.isRequired,
  price0: PropTypes.string.isRequired,
  price1: PropTypes.string.isRequired,
  usdAmount0: PropTypes.number.isRequired,
  usdAmount1: PropTypes.number.isRequired,
}
