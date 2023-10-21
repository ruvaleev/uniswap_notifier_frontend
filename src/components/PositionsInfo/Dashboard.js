import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const Dashboard = ({positions}) => {
  if (positions.errors) { return }

  const totalValue = positions.reduce((acc, pos) => acc + pos.totalUsdValue, 0);
  const totalFees = positions.reduce((acc, pos) => acc + pos.token0.usdFees + pos.token1.usdFees, 0);

  return (
    <div className="grid-container">
      <div className="grid-item">Dashboard:</div>
      <div className="grid-item">Total Portfolio Value: {moneyFormat(totalValue)}</div>
      <div className="grid-item">Total Fees: {moneyFormat(totalFees)}</div>
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
