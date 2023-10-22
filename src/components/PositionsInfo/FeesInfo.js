import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FeesInfo = ({token0, token1}) => {
  return (
    token0.fees &&
      <div className="grid-item leading-4 my-2">
        <div className="grid-item secondary text-sm">Fees Earned:</div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{token0.symbol}: </span>
          <span className="leading-4 primary text-base">{token0.fees}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees)})</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{token1.symbol}: </span>
          <span className="leading-4 primary text-base">{token1.fees}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(token1.usdFees)})</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">Total Fees: </span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees + token1.usdFees)})</span>
        </div>
      </div>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
