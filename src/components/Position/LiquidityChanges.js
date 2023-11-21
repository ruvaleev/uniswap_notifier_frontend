import React from 'react';
import PropTypes from 'prop-types';

import Row from '__components/Row';
import dateWithHyphens from '__helpers/dateWithHyphens';

const NoChanges = () => <span className="grid-item secondary text-sm">No changes</span>

const Change = ({ timestamp, change }) => (
  <div className="grid-item">
    <Row title={`${dateWithHyphens(timestamp)}:`} value={`${change > 0 ? '+' : ''}${change}%`}/>
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
      <Row title='Liquidity changes:'/>
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
