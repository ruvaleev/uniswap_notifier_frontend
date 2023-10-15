import BigNumber from 'bignumber.js';
import { Q128, Q256, ZERO } from '__constants';

function subIn256(x, y) {
  const difference = x - y;
  if (difference < ZERO) {
    return Q256 + difference;
  } else {
    return difference;
  }
}

function toBigNumber(num) {
  return new BigNumber(num);
}

function getFees(
  feeGrowthGlobal0, feeGrowthGlobal1, feeGrowth0Low, feeGrowth0Hi, feeGrowthInside0,
  feeGrowth1Low, feeGrowth1Hi, feeGrowthInside1, liquidity, decimals0, decimals1, tickLower, tickUpper, tickCurrent
) {
  let feeGrowthGlobal_0 = toBigNumber(feeGrowthGlobal0);
  let feeGrowthGlobal_1 = toBigNumber(feeGrowthGlobal1);
  let feeGrowthInsideLast_0 = toBigNumber(feeGrowthInside0);
  let feeGrowthInsideLast_1 = toBigNumber(feeGrowthInside1);
  let tickLowerFeeGrowthOutside_0 = toBigNumber(feeGrowth0Low);
  let tickLowerFeeGrowthOutside_1 = toBigNumber(feeGrowth1Low);
  let tickUpperFeeGrowthOutside_0 = toBigNumber(feeGrowth0Hi);
  let tickUpperFeeGrowthOutside_1 = toBigNumber(feeGrowth1Hi);
  let tickLowerFeeGrowthBelow_0 = ZERO;
  let tickLowerFeeGrowthBelow_1 = ZERO;
  let tickUpperFeeGrowthAbove_0 = ZERO;
  let tickUpperFeeGrowthAbove_1 = ZERO;

  if (tickCurrent >= tickUpper){
    tickUpperFeeGrowthAbove_0 = subIn256(feeGrowthGlobal_0, tickUpperFeeGrowthOutside_0);
    tickUpperFeeGrowthAbove_1 = subIn256(feeGrowthGlobal_1, tickUpperFeeGrowthOutside_1);
  } else {
    tickUpperFeeGrowthAbove_0 = tickUpperFeeGrowthOutside_0
    tickUpperFeeGrowthAbove_1 = tickUpperFeeGrowthOutside_1
  }

  if (tickCurrent >= tickLower){
    tickLowerFeeGrowthBelow_0 = tickLowerFeeGrowthOutside_0
    tickLowerFeeGrowthBelow_1 = tickLowerFeeGrowthOutside_1
  } else{
    tickLowerFeeGrowthBelow_0 = subIn256(feeGrowthGlobal_0, tickLowerFeeGrowthOutside_0);
    tickLowerFeeGrowthBelow_1 = subIn256(feeGrowthGlobal_1, tickLowerFeeGrowthOutside_1);
  }

  let fr_t1_0 = subIn256(subIn256(feeGrowthGlobal_0, tickLowerFeeGrowthBelow_0), tickUpperFeeGrowthAbove_0);
  let fr_t1_1 = subIn256(subIn256(feeGrowthGlobal_1, tickLowerFeeGrowthBelow_1), tickUpperFeeGrowthAbove_1);

  // The final calculations uncollected fees formula
  let uncollectedFees_0 = (liquidity * subIn256(fr_t1_0, feeGrowthInsideLast_0)) / Q128;
  let uncollectedFees_1 = (liquidity * subIn256(fr_t1_1, feeGrowthInsideLast_1)) / Q128;

  // Decimal adjustment to get final results
  let uncollectedFeesAdjusted_0 = (uncollectedFees_0 / toBigNumber(10**decimals0)).toFixed(decimals0);
  let uncollectedFeesAdjusted_1 = (uncollectedFees_1 / toBigNumber(10**decimals1)).toFixed(decimals1);

  return {fees0: uncollectedFeesAdjusted_0, fees1: uncollectedFeesAdjusted_1}
}

export default getFees;
