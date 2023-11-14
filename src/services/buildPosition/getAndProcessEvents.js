import BigNumber from 'bignumber.js';

import getEvents from '__services/getEvents';

const totalLiquidity = (collection) => (
  collection.reduce((acc, pos) => (
    acc.plus(BigNumber(pos.liquidity))
  ), BigNumber(0))
);

const calculateHoldUsdValue = (initialAmount, usdPrice, events) => {
  const sortedIncreasesEvents = events.liquidityIncreases.sort((a, b) => a.blockNumber - b.blockNumber)
  const initialLiquidity = BigNumber(sortedIncreasesEvents[0]?.liquidity || 0)
  const sumLiquidityIncreased = totalLiquidity(sortedIncreasesEvents.slice(1, sortedIncreasesEvents.length))
  const sumLiquidityDecreased = totalLiquidity(events.liquidityDecreases)
  const totalLiquidityChangedBy = sumLiquidityIncreased.minus(sumLiquidityDecreased)
  const liquidityChangedByPercent = totalLiquidityChangedBy.multipliedBy(100).dividedBy(initialLiquidity)
  const currentAmountHold =
    initialAmount.plus(initialAmount.multipliedBy(liquidityChangedByPercent).dividedBy(100))

  return currentAmountHold.multipliedBy(usdPrice)
}

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
      timestamp: timestamp
    }
  })
}

const getAndProcessEvents = async (position, prices) => {
  await getEvents(position.id, position.token0, position.token1).then(async (events) =>{
    position.token0.holdUsdValue =
      calculateHoldUsdValue(BigNumber(position.depositedToken0), prices[position.token0.symbol], events)
    position.token1.holdUsdValue =
      calculateHoldUsdValue(BigNumber(position.depositedToken1), prices[position.token1.symbol], events)
    position.events = events
    position.feesClaims = serializeCollects(events.collects, events.liquidityDecreases)
  })
}

export default getAndProcessEvents;
