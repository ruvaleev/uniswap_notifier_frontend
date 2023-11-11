import BigNumber from 'bignumber.js';

import { Q96 } from '__constants';
import getTokenAmounts from './getTokenAmounts';
import priceFromTick from './priceFromTick';

function tickToSqrtPrice(tick) {
  const base = 1.0001;
  let sqrtPrice = BigNumber(Math.pow(base, Math.abs(tick) / 2));
  if (tick < 0) {
    sqrtPrice = BigNumber('1').dividedBy(sqrtPrice);
  }

  const sqrtPriceX96 = sqrtPrice.multipliedBy(Q96);

  return sqrtPriceX96;
}

function costInToken(amount, amountOpposite, price) {
  return amountOpposite.dividedBy(BigNumber(price)).plus(amount)
}

// Погрешность получается около 0.2%
function getILData(tick, initialTick, lowerTick, upperTick, liquidity, decimals0, decimals1) {
  const initialSqrtPriceX96 = tickToSqrtPrice(initialTick)
  const initialProportions = getTokenAmounts(liquidity, initialSqrtPriceX96, lowerTick, upperTick, decimals0, decimals1)
  const initialPrices = priceFromTick(initialTick, decimals0, decimals1)

  const sqrtPriceX96 = tickToSqrtPrice(tick)
  const tickProportions = getTokenAmounts(liquidity, sqrtPriceX96, lowerTick, upperTick, decimals0, decimals1)
  const tickPrices = priceFromTick(tick, decimals0, decimals1)

  const initialCostInToken0 = costInToken(initialProportions.amount0, initialProportions.amount1, initialPrices.price0)
  const initialCostInToken1 = costInToken(initialProportions.amount1, initialProportions.amount0, initialPrices.price1)

  const tickCostInToken0 = costInToken(tickProportions.amount0, tickProportions.amount1, tickPrices.price0)
  const tickCostInToken1 = costInToken(tickProportions.amount1, tickProportions.amount0, tickPrices.price1)

  const percents = BigNumber('100')
  const ilToken0 = percents.minus(tickCostInToken0.multipliedBy(percents).dividedBy(initialCostInToken0))
  const ilToken1 = percents.minus(tickCostInToken1.multipliedBy(percents).dividedBy(initialCostInToken1))

  return {
    impermanentLoss: Math.max(ilToken0, ilToken1),
    tickProportions: tickProportions,
    tickPrices: tickPrices

  }
}

export default getILData;
