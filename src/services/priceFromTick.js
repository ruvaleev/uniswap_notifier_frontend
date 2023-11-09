import { PRICE_PRECISION } from '__constants';

function priceFromTick(tick, decimals0, decimals1) {
  const price0 = ((1.0001 ** tick) / (10 ** (decimals0 - decimals1))).toFixed(PRICE_PRECISION)
  const price1 = (1 / price0).toFixed(PRICE_PRECISION)

  return { price0, price1 }
}

export default priceFromTick;
