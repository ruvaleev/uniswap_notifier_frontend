import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import getFees from '__services/getFees';
import getPool from '__services/getPool';
import getTokenAmounts from '__services/getTokenAmounts';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';
import CommonInfo from './CommonInfo';
import FeesInfo from './FeesInfo';
import FinalResult from './FinalResult';
import ImpermanentLossInfo from './ImpermanentLossInfo';

const Position = ({position, prices}) => {
  const [fees, setFees] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await getPool(position.pool.id, position.tickLower, position.tickUpper)
      const fees = getFees(
        BigNumber(res.feeGrowthGlobal0X128.toString()),
        BigNumber(res.feeGrowthGlobal1X128.toString()),
        BigNumber(res.lowTickFeeGrowthOutside0X128.toString()),
        BigNumber(res.highTickFeeGrowthOutside0X128.toString()),
        BigNumber(position.feeGrowthInside0LastX128),
        BigNumber(res.lowTickFeeGrowthOutside1X128.toString()),
        BigNumber(res.highTickFeeGrowthOutside1X128.toString()),
        BigNumber(position.feeGrowthInside1LastX128),
        BigNumber(position.liquidity),
        position.token0.decimals,
        position.token1.decimals,
        Number(position.tickLower),
        Number(position.tickUpper),
        Number(position.pool.tick)
      )

      setFees(fees)
    }
    fetchData()
  }, []);

  const { price0, price1 } = sqrtPriceToReadablePrices(
    position.pool.sqrtPrice,
    position.token0.decimals,
    position.token1.decimals,
  );
  const token0 = position.token0.symbol
  const token1 = position.token1.symbol
  const { amount0, amount1 } = getTokenAmounts(
    position.liquidity,
    position.pool.sqrtPrice,
    position.tickLower,
    position.tickUpper,
    position.token0.decimals,
    position.token1.decimals
  )
  const token0Price = prices[position.token0.symbol]
  const usdAmount0 = token0Price * amount0
  const token1Price = prices[position.token1.symbol]
  const usdAmount1 = token1Price * amount1
  const totalValue = (token0Price * amount0) + (token1Price * amount1)

  // Impremanent Loss
  const depositedUsd = BigNumber(position.amountDepositedUSD)
  const initialAmount0 = BigNumber(position.depositedToken0)
  const initialAmount1 = BigNumber(position.depositedToken1)
  const holdUsd0 = initialAmount0 * token0Price
  const holdUsd1 = initialAmount1 * token1Price
  const usdFees0 = fees.fees0 * prices[token0]
  const usdFees1 = fees.fees1 * prices[token1]

  return (
    <div className="grid-container">
      <CommonInfo
        id={position.id}
        token0={token0} token1={token1}
        amount0={amount0} amount1={amount1}
        price0={price0} price1={price1}
        usdAmount0={usdAmount0} usdAmount1={usdAmount1}
      />
      {
        fees.fees0 &&
          <FeesInfo
            token0={token0} token1={token1}
            fees0={fees.fees0} fees1={fees.fees1}
            usdFees0={usdFees0} usdFees1={usdFees1}
          />
      }
      <ImpermanentLossInfo
        depositedUsd={depositedUsd}
        token0={token0}
        token1={token1}
        initialAmount0={initialAmount0}
        initialAmount1={initialAmount1}
        holdUsd0={holdUsd0}
        holdUsd1={holdUsd1}
        totalValue={totalValue}
      />
      <FinalResult
        totalValueWithFeesUsd={totalValue + usdFees0 + usdFees1}
        totalHoldUsd={holdUsd0 + holdUsd1}
      />
    </div>
  )
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
}
