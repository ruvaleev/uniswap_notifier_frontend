import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FeesInfo = ({token0, token1}) => {
  return (
    token0.fees && <>
      <div className="grid-item">{token0.fees} of {token0.symbol} ({moneyFormat(token0.usdFees)})</div>
      <div className="grid-item">{token1.fees} of {token1.symbol} ({moneyFormat(token1.usdFees)})</div>
      <div className="grid-item">Total fees: {moneyFormat(token0.usdFees + token1.usdFees)}</div>
    </>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
