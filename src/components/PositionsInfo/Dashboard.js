import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import moneyFormat from '__helpers/moneyFormat';

const Dashboard = ({positions}) => {
  if (positions.errors) { return }

  const totalValue = positions.reduce((acc, pos) => acc.plus(pos.totalUsdValue), BigNumber(0));
  const totalFees = positions.reduce((acc, pos) => acc.plus(pos.token0.usdFees?.plus(pos.token1.usdFees)), BigNumber(0));

  return (
    <div className="grid-container" data-testid='dashboard'>
      <div className="grid-item">
        <span className="secondary text-sm">Total Portfolio Value (fees not included): </span>
        <span className="primary text-base">{moneyFormat(totalValue)}</span>
      </div>
      <div className="grid-item">
        <span className="secondary text-sm">Total Fees: </span>
        <span className="primary text-base">{moneyFormat(totalFees)}</span>
      </div>
    </div>
  )
}

export default Dashboard;

Dashboard.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ]),
}
