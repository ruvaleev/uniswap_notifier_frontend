import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FinalResult = ({ position }) => {
  const totalValueWithFeesUsd = position.totalUsdValue + position.token0.usdFees + position.token1.usdFees
  const totalHoldUsd = position.token0.holdUsdValue + position.token1.holdUsdValue
  const totalEarnedConsideringIlUsd = totalValueWithFeesUsd - totalHoldUsd
  const totalEarnedConsideringIlPercentage = (totalEarnedConsideringIlUsd / totalHoldUsd) * 100
  return (
    <>
      <div className="grid-item">Final result:</div>
      <div className="grid-item">Total Profit considering IL: {moneyFormat(totalEarnedConsideringIlUsd)}</div>
      <div className="grid-item">Total Profit %: {totalEarnedConsideringIlPercentage.toFixed(4)}</div>
    </>
  )
};

export default FinalResult;

FinalResult.propTypes = {
  position: PropTypes.object.isRequired,
}
