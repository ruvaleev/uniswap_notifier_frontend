import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FinalResult = ({ position }) => {
  if (!position.totalUsdValue) { return }

  const totalValueWithFeesUsd = position.totalUsdValue.plus(position.token0.usdFees).plus(position.token1.usdFees)
  const totalHoldUsd = position.token0.holdUsdValue.plus(position.token1.holdUsdValue)
  const totalEarnedConsideringIlUsd = totalValueWithFeesUsd.minus(totalHoldUsd)
  const totalEarnedConsideringIlPercentage = totalEarnedConsideringIlUsd.multipliedBy(100).dividedBy(totalHoldUsd)

  return (
    <div className="grid-item leading-4 my-2">
      <div className="grid-item secondary text-sm">Final result:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit considering IL: </span>
        <span className="leading-4 primary text-base">{moneyFormat(totalEarnedConsideringIlUsd)}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit %: </span>
        <span className="leading-4 primary text-base">{totalEarnedConsideringIlPercentage.toFixed(4)}%</span>
      </div>
    </div>
  )
};

export default FinalResult;

FinalResult.propTypes = {
  position: PropTypes.object.isRequired,
}
