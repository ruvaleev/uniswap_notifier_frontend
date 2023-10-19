import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const FinalResult = ({ totalValueWithFeesUsd, totalHoldUsd }) => {
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
  totalValueWithFeesUsd: PropTypes.number.isRequired,
  totalHoldUsd: PropTypes.number.isRequired,
}
