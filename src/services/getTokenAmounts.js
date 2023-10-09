import { Q96 } from '__constants';

const getTickAtSqrtPrice = (sqrtPriceX96) => (
  Math.floor(
    Math.log(Math.pow(sqrtPriceX96 / Q96, 2)) / Math.log(1.0001)
  )
)

function getTokenAmounts(liquidity, sqrtPriceX96, tickLow, tickHigh, decimal0, decimal1){
  let sqrtRatioA = Math.sqrt(Math.pow(1.0001, tickLow));
  let sqrtRatioB = Math.sqrt(Math.pow(1.0001, tickHigh));
  let currentTick = getTickAtSqrtPrice(sqrtPriceX96);
  let sqrtPrice = sqrtPriceX96 / Q96;
  let amount0InDecimal = 0;
  let amount1InDecimal = 0;

  if(currentTick < tickLow){
    amount0InDecimal = Math.floor(liquidity * ((sqrtRatioB - sqrtRatioA) / (sqrtRatioA * sqrtRatioB)));
  }
  else if(currentTick >= tickHigh){
    amount1InDecimal = Math.floor(liquidity * (sqrtRatioB - sqrtRatioA));
  }
  else if(currentTick >= tickLow && currentTick < tickHigh){
    amount0InDecimal = Math.floor(liquidity * ((sqrtRatioB - sqrtPrice) / (sqrtPrice * sqrtRatioB)));
    amount1InDecimal = Math.floor(liquidity * (sqrtPrice - sqrtRatioA));
  }

  let amount0 = Number((amount0InDecimal / Math.pow(10, decimal0)).toFixed(decimal0));
  let amount1 = Number((amount1InDecimal / Math.pow(10, decimal1)).toFixed(decimal1));

  return { amount0, amount1 };
}

export default getTokenAmounts;
