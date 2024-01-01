import React from 'react';
import PropTypes from 'prop-types';

import NewRow from '__components/NewRow';
import moneyFormat from '__helpers/moneyFormat';

const Dashboard = ({totalUsdValue, totalUnclaimedUsdFees, totalClaimedUsdFees}) => {
  return (
    <div className="dashboard grid-container h-fit min-width-30" data-testid='dashboard'>
      <NewRow
        title='Total Portfolio Value'
        subtitle='(fees not included)'
        value={moneyFormat(totalUsdValue)}
        classNames='mb-7'
      />
      <NewRow title='Total Unclaimed Fees' value={moneyFormat(totalUnclaimedUsdFees)} classNames='mb-7'/>
      <NewRow title='Total Claimed Fees' value={moneyFormat(totalClaimedUsdFees)} classNames='mb-7'/>
      <NewRow
        title='Total Fees Earned'
        subtitle='(Claimed + Unclaimed)'
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
