import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';
import BigNumber from 'bignumber.js';

const sumByTimestamp = (collection) => (
  collection.reduce((acc, { amount0, amount1, timestamp }) => {
    if (acc[timestamp]) {
      acc[timestamp].amount0 = acc[timestamp].amount0.plus(BigNumber(amount0));
      acc[timestamp].amount1 = acc[timestamp].amount1.plus(BigNumber(amount1));
    } else {
      acc[timestamp] = {
        amount0: BigNumber(amount0),
        amount1: BigNumber(amount1)
      };
    }
    return acc;
  }, {})
)

const pricesByTimestamp = (events) => (
  events.reduce((acc, {usdPrice0, usdPrice1, timestamp}) => {
    acc[timestamp] ||
      (acc[timestamp] = { usdPrice0: BigNumber(usdPrice0), usdPrice1: BigNumber(usdPrice1) })
    return acc;
  }, {})
)

const serializeCollects = (collects, liquidityDecreases) => {
  const decreasesHash = sumByTimestamp(liquidityDecreases)
  const collectsHash = sumByTimestamp(collects)
  const prices = pricesByTimestamp(collects.concat(liquidityDecreases))

  return Object.keys(collectsHash).sort().map((timestamp) => {
    const amount0 = collectsHash[timestamp].amount0.minus(
      decreasesHash[timestamp]?.amount0 || 0
    )
    const amount1 = collectsHash[timestamp].amount1.minus(
      decreasesHash[timestamp]?.amount1 || 0
    )
    const usdAmount0 = amount0.multipliedBy(prices[timestamp].usdPrice0)
    const usdAmount1 = amount1.multipliedBy(prices[timestamp].usdPrice1)

    return {
      amount0,
      amount1,
      usdAmount0,
      usdAmount1,
      datetime: new Date(timestamp * 1000).toDateString()
    }
  })
}

const Collect = ({ collect, token0Symbol, token1Symbol }) => (
  <>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm"> ({collect.datetime}):</span>
    </div>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">{token0Symbol}: </span>
      <span className="leading-4 primary text-base">{collect.amount0.toFixed()}</span>
      <span className="leading-4 secondary text-sm"> ({moneyFormat(collect.usdAmount0)})</span>
    </div>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">{token1Symbol}: </span>
      <span className="leading-4 primary text-base">{collect.amount1.toFixed()}</span>
      <span className="leading-4 secondary text-sm"> ({moneyFormat(collect.usdAmount1)})</span>
    </div>
  </>
)

const ClaimedFees = ({ collects, liquidityDecreases, token0Symbol, token1Symbol }) => {
  if (!collects) { return }

  const serializedCollects = serializeCollects(collects, liquidityDecreases)

  return (
    <>
      <div className="grid-item secondary text-sm">Claimed Fees:</div>
      {
        serializedCollects.map((collect, index) => (
          <Collect key={index} collect={collect} token0Symbol={token0Symbol} token1Symbol={token1Symbol} />
        ))
      }
    </>
  )
}

const UnclaimedFees = ({ token0, token1 }) => {
  return (
    <>
      <div className="grid-item secondary text-sm">Unclaimed Fees Earned:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{token0.symbol}: </span>
        <span className="leading-4 primary text-base">{token0.fees.toFixed()}</span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees)})</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{token1.symbol}: </span>
        <span className="leading-4 primary text-base">{token1.fees.toFixed()}</span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token1.usdFees)})</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Unclaimed Fees: </span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees.plus(token1.usdFees))})</span>
      </div>
    </>
  )
}

const FeesInfo = ({token0, token1, collects, liquidityDecreases}) => {
  return (
    token0.fees &&
      <div className="grid-item leading-4 my-2">
        <UnclaimedFees token0={token0} token1={token1} />
        <ClaimedFees collects={collects} liquidityDecreases={liquidityDecreases} token0Symbol={token0.symbol} token1Symbol={token1.symbol} />
      </div>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
  collects: PropTypes.arrayOf(PropTypes.object),
  liquidityDecreases: PropTypes.arrayOf(PropTypes.object),
}

Collect.propTypes = {
  collect: PropTypes.object.isRequired,
  token0Symbol: PropTypes.string.isRequired,
  token1Symbol: PropTypes.string.isRequired,
}

ClaimedFees.propTypes = {
  collects: PropTypes.arrayOf(PropTypes.object).isRequired,
  liquidityDecreases: PropTypes.arrayOf(PropTypes.object).isRequired,
  token0Symbol: PropTypes.string.isRequired,
  token1Symbol: PropTypes.string.isRequired,
}

UnclaimedFees.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
