import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const Dashboard = ({totalUsdValue, totalUnclaimedUsdFees, totalClaimedUsdFees}) => {
  return (
    <div className="grid-container" data-testid='dashboard'>
      <div className="grid-item">
        <span className="secondary text-sm">Total Portfolio Value (fees not included): </span>
        <span className="primary text-base">{moneyFormat(totalUsdValue)}</span>
      </div>
      <div className="grid-item">
        <span className="secondary text-sm">Total Unclaimed Fees: </span>
        <span className="primary text-base">{moneyFormat(totalUnclaimedUsdFees)}</span>
      </div>
      <div className="grid-item">
        <span className="secondary text-sm">Total Claimed Fees: </span>
        <span className="primary text-base">{moneyFormat(totalClaimedUsdFees)}</span>
      </div>
      <div className="grid-item">
        <span className="secondary text-sm">Total Fees Earned (Claimed + Unclaimed): </span>
        <span className="primary text-base">{moneyFormat(totalClaimedUsdFees?.plus(totalUnclaimedUsdFees))}</span>
      </div>
    </div>
  )
}

export default Dashboard;

Dashboard.propTypes = {
  totalUsdValue: PropTypes.object.isRequired,
  totalUnclaimedUsdFees: PropTypes.object.isRequired,
  totalClaimedUsdFees: PropTypes.object.isRequired,
}
