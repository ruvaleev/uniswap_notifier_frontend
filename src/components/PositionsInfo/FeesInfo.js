import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FeesInfo = ({token0, token1, fees0, fees1, usdFees0, usdFees1}) => {
  return (
    <>
      <div className="grid-item">{fees0} of {token0} ({moneyFormat(usdFees0)})</div>
      <div className="grid-item">{fees1} of {token1} ({moneyFormat(usdFees1)})</div>
      <div className="grid-item">Total fees: {moneyFormat(usdFees0 + usdFees1)}</div>
    </>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  token0: PropTypes.string.isRequired,
  token1: PropTypes.string.isRequired,
  fees0: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  fees1: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  usdFees0: PropTypes.number.isRequired,
  usdFees1: PropTypes.number.isRequired,
}
