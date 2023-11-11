import BigNumber from 'bignumber.js';

function priceFromTick(tick, decimals0, decimals1) {
  let price0 = BigNumber(1.0001 ** Math.abs(tick)).dividedBy(BigNumber(10 ** Math.abs(decimals0 - decimals1)))
  if (tick < 0) { price0 = BigNumber(1).dividedBy(price0) }
  const price1 = BigNumber(1).dividedBy(price0)

  return { price0: price0, price1: price1 }
}

export default priceFromTick;
