import BigNumber from 'bignumber.js';
import { Q96 } from '__constants';

const sqrtPriceToReadablePrices = (sqrtPriceString, decimals0, decimals1) => {
  const sqrtPrice = BigNumber(sqrtPriceString);
  const sqrtPriceRatio = sqrtPrice.dividedBy(Q96);

  const price0 = sqrtPriceRatio.pow(2).multipliedBy(BigNumber(10).pow(decimals0 - decimals1));
  const price1 = BigNumber(1).dividedBy(price0);

  return { price0, price1 }
}

export default sqrtPriceToReadablePrices;
