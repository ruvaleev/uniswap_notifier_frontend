import React from 'react';
import PropTypes from 'prop-types';

import Row from '__components/Row';
import moneyFormat from '__helpers/moneyFormat';

const Dashboard = ({totalUsdValue, totalUnclaimedUsdFees, totalClaimedUsdFees}) => {
  return (
    <div className="dashboard grid-container" data-testid='dashboard'>
      <Row title='Total Portfolio Value (fees not included):' value={moneyFormat(totalUsdValue)}/>
      <Row title='Total Unclaimed Fees:' value={moneyFormat(totalUnclaimedUsdFees)}/>
      <Row title='Total Claimed Fees:' value={moneyFormat(totalClaimedUsdFees)}/>
      <Row
        title='Total Fees Earned (Claimed + Unclaimed):'
        value={moneyFormat(totalClaimedUsdFees?.plus(totalUnclaimedUsdFees))}
      />
    </div>
  )
}

export default Dashboard;

Dashboard.propTypes = {
  totalUsdValue: PropTypes.object.isRequired,
  totalUnclaimedUsdFees: PropTypes.object.isRequired,
  totalClaimedUsdFees: PropTypes.object.isRequired,
}
