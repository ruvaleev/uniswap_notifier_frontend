import BigNumber from 'bignumber.js';

import getFees from '__services/getFees';
import getPool from '__services/getPool';
import getTokenAmounts from '__services/getTokenAmounts';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';
import priceFromTick from '__services/priceFromTick';

const getFeesInfo = async (position, prices) => {
  const poolData = await getPool(position.pool.id, position.tickLower, position.tickUpper)
  const fees = getFees(
    BigNumber(poolData.feeGrowthGlobal0X128.toString()),
    BigNumber(poolData.feeGrowthGlobal1X128.toString()),
    BigNumber(poolData.lowTickFeeGrowthOutside0X128.toString()),
    BigNumber(poolData.highTickFeeGrowthOutside0X128.toString()),
    BigNumber(position.feeGrowthInside0LastX128),
    BigNumber(poolData.lowTickFeeGrowthOutside1X128.toString()),
    BigNumber(poolData.highTickFeeGrowthOutside1X128.toString()),
    BigNumber(position.feeGrowthInside1LastX128),
    BigNumber(position.liquidity),
    position.token0.decimals,
    position.token1.decimals,
    Number(position.tickLower),
    Number(position.tickUpper),
    Number(position.pool.tick)
  )

  const { price0, price1 } = sqrtPriceToReadablePrices(
    position.pool.sqrtPrice,
    position.token0.decimals,
    position.token1.decimals,
  );
  const { amount0, amount1 } = getTokenAmounts(
    position.liquidity,
    position.pool.sqrtPrice,
    position.tickLower,
    position.tickUpper,
    position.token0.decimals,
    position.token1.decimals
  )

  const enrichTokenInfo = ({ tokenInfo, amount, initialAmount, fees, price, minPrice, maxPrice, usdPrice }) => {
    tokenInfo.amount = amount
    tokenInfo.initialAmount = initialAmount
    tokenInfo.fees = fees
    tokenInfo.price = price
    tokenInfo.minPrice = minPrice
    tokenInfo.maxPrice = maxPrice
    tokenInfo.usdPrice = usdPrice
    tokenInfo.usdValue = amount.multipliedBy(usdPrice)
    tokenInfo.usdFees = fees.multipliedBy(usdPrice)
  }

  const { price0: minPrice0, price1: minPrice1 } = priceFromTick(position.tickLower, position.token0.decimals, position.token1.decimals)
  const { price0: maxPrice0, price1: maxPrice1 } = priceFromTick(position.tickUpper, position.token0.decimals, position.token1.decimals)

  enrichTokenInfo({
    tokenInfo: position.token0,
    amount: amount0,
    initialAmount: BigNumber(position.depositedToken0),
    fees: fees.fees0,
    price: price0,
    minPrice: minPrice0,
    maxPrice: maxPrice0,
    usdPrice: prices[position.token0.symbol]
  });
  enrichTokenInfo({
    tokenInfo: position.token1,
    amount: amount1,
    initialAmount: BigNumber(position.depositedToken1),
    fees: fees.fees1,
    price: price1,
    minPrice: minPrice1,
    maxPrice: maxPrice1,
    usdPrice: prices[position.token1.symbol]
  })
  position.totalUsdValue = position.token0.usdValue.plus(position.token1.usdValue)
}

export default getFeesInfo;
