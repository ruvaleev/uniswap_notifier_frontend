import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

const NoChanges = () => <span className="grid-item secondary text-sm">No changes</span>

const Change = ({ change }) => (
  <div className="grid-item">
    <span className="leading-4 secondary text-sm">{change[1].toDateString()}: </span>
    <span className="leading-4 primary text-sm">{change[2]}%</span>
  </div>
)

const Changes = ({ changes }) => (
  changes.length === 0
  ? <NoChanges/>
  : changes.map((change, index) => <Change key={index} change={change} />)
)

const LiquidityChanges = ({ increases, decreases }) => {
  const serializedIncreases = increases.map((l) => [BigNumber(l.liquidity), new Date(l.timestamp * 1000)])
  const serializedDecreases = decreases.map((l) => [BigNumber(-l.liquidity), new Date(l.timestamp * 1000)])
  const changes = serializedIncreases.concat(serializedDecreases).sort((a, b) => a[1] - b[1])

  let current_liquidity = changes[0][0]
  const serializedChanges = changes.slice(1).map((change) => {
    change[2] = change[0].multipliedBy(100).dividedBy(current_liquidity).toFixed(0)
    if (change[0] > 0) { change[2] = `+${change[2]}` }
    current_liquidity = current_liquidity.plus(change[0])
    return change
  })

  return (
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">Liquidity changes: </span>
      <Changes changes={serializedChanges} />
    </div>
  )
}

export default LiquidityChanges;

LiquidityChanges.propTypes = {
  increases: PropTypes.arrayOf(PropTypes.object).isRequired,
  decreases: PropTypes.arrayOf(PropTypes.object).isRequired
}

Change.propTypes = {
  change: PropTypes.array.isRequired
}

Changes.propTypes = {
  changes: PropTypes.arrayOf(PropTypes.array).isRequired
}
