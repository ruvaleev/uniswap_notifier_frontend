import BigNumber from 'bignumber.js';
import { PRICE_PRECISION } from '__constants';

const sqrtPriceToReadablePrices = (sqrtPriceString, decimals0, decimals1) => {
  const sqrtPrice = new BigNumber(sqrtPriceString);
  const shift = new BigNumber(2).pow(96);
  const sqrtPriceRatio = sqrtPrice.dividedBy(shift);

  const priceToken1InToken0 = sqrtPriceRatio.pow(2).multipliedBy(new BigNumber(10).pow(decimals0 - decimals1));
  const priceToken0InToken1 = new BigNumber(1).dividedBy(priceToken1InToken0);

  return {
    price0: priceToken0InToken1.toFixed(PRICE_PRECISION),
    price1: priceToken1InToken0.toFixed(PRICE_PRECISION)
  }
}

export default sqrtPriceToReadablePrices;
