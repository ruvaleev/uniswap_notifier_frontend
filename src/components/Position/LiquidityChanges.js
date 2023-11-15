import React from 'react';
import PropTypes from 'prop-types';

import dateWithHyphens from '__helpers/dateWithHyphens';

const NoChanges = () => <span className="grid-item secondary text-sm">No changes</span>

const Change = ({ timestamp, change }) => (
  <div className="grid-item">
    <span className="leading-4 secondary text-sm">{dateWithHyphens(timestamp)}: </span>
    <span className="leading-4 primary text-sm">{change > 0 && '+'}{change}%</span>
  </div>
)

const Changes = ({ changes }) => {
  const timestamps = Object.keys(changes)

  return timestamps.length === 0
  ? <NoChanges/>
  : timestamps.map((timestamp, index) => <Change key={index} timestamp={timestamp} change={changes[timestamp]} />)
}

const LiquidityChanges = ({ changes }) => {
  return (
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">Liquidity changes: </span>
      <Changes changes={changes} />
    </div>
  )
}

export default LiquidityChanges;

LiquidityChanges.propTypes = {
  changes: PropTypes.object.isRequired
}

Change.propTypes = {
  change: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
}

Changes.propTypes = {
  changes: PropTypes.object.isRequired
}
