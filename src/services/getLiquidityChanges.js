import BigNumber from 'bignumber.js';

function serializeChanges(increases, decreases) {
  const result = {}
  increases.reduce((res, log) => {
    res[log.timestamp] ||= BigNumber(0)
    res[log.timestamp] = res[log.timestamp].plus(BigNumber(log.liquidity))

    return res
  }, result)
  decreases.reduce((res, log) => {
    res[log.timestamp] ||= BigNumber(0)
    res[log.timestamp] = res[log.timestamp].minus(BigNumber(log.liquidity))

    return res
  }, result)

  return result
}

function getLiquidityChanges(increases, decreases) {
  const allChanges = serializeChanges(increases, decreases)
  const timestamps = Object.keys(allChanges).sort()

  let currentLiquidity = allChanges[timestamps[0]]

  return timestamps.slice(1).reduce((res, timestamp) => {
    res[timestamp] = allChanges[timestamp].multipliedBy(100).dividedBy(currentLiquidity).toFixed(0)
    currentLiquidity = currentLiquidity.plus(allChanges[timestamp])

    return res
  }, {})
}

export default getLiquidityChanges;
