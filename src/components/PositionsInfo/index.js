import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import { WalletContext } from '__contexts/WalletContext';
import getEvents from '__services/getEvents';
import getFees from '__services/getFees';
import getPool from '__services/getPool';
import getPrice from '__services/getPrice';
import getTokenAmounts from '__services/getTokenAmounts';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';
import fetchPositions from '__services/graph/fetchPositions';
import Dashboard from './Dashboard';
import PositionsList from './PositionsList';
import PricesList from './PricesList';
import priceFromTick from '../../services/priceFromTick';

const enrichPosition = async (position, prices) => {
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

  const totalLiquidity = (collection) => (
    collection.reduce((acc, pos) => acc.plus(BigNumber(pos.liquidity)), BigNumber(0))
  );

  const enrichTokenInfo = ({ tokenInfo, amount, initialAmount, fees, price, minPrice, maxPrice, usdPrice, increasesEvents, decreasesEvents }) => {
    const sortedIncreasesEvents = increasesEvents.sort((a, b) => a.blockNumber - b.blockNumber)
    const initialLiquidity = BigNumber(sortedIncreasesEvents[0].liquidity)
    const sumLiquidityIncreased = totalLiquidity(sortedIncreasesEvents.slice(1, sortedIncreasesEvents.length))
    const sumLiquidityDecreased = totalLiquidity(decreasesEvents)
    const totalLiquidityChangedBy = sumLiquidityIncreased.minus(sumLiquidityDecreased)
    const liquidityChangedByPercent = totalLiquidityChangedBy.multipliedBy(100).dividedBy(initialLiquidity)
    const currentAmountHold = initialAmount.plus(initialAmount.multipliedBy(liquidityChangedByPercent).dividedBy(100))

    tokenInfo.amount = amount
    tokenInfo.initialAmount = initialAmount
    tokenInfo.fees = fees
    tokenInfo.price = price
    tokenInfo.minPrice = minPrice
    tokenInfo.maxPrice = maxPrice
    tokenInfo.usdPrice = usdPrice
    tokenInfo.usdValue = amount.multipliedBy(usdPrice)
    tokenInfo.usdFees = fees.multipliedBy(usdPrice)
    tokenInfo.holdUsdValue = currentAmountHold.multipliedBy(usdPrice)
  }

  const { price0: minPrice0, price1: minPrice1 } = priceFromTick(position.tickLower, position.token0.decimals, position.token1.decimals)
  const { price0: maxPrice0, price1: maxPrice1 } = priceFromTick(position.tickUpper, position.token0.decimals, position.token1.decimals)

  await getEvents(position.id, position.token0, position.token1).then((events) =>{
    position.events = events

    enrichTokenInfo({
      tokenInfo: position.token0,
      amount: amount0,
      initialAmount: BigNumber(position.depositedToken0),
      fees: fees.fees0,
      price: price0,
      minPrice: minPrice0,
      maxPrice: maxPrice0,
      usdPrice: prices[position.token0.symbol],
      increasesEvents: position.events.liquidityIncreases,
      decreasesEvents: position.events.liquidityDecreases,
    });
    enrichTokenInfo({
      tokenInfo: position.token1,
      amount: amount1,
      initialAmount: BigNumber(position.depositedToken1),
      fees: fees.fees1,
      price: price1,
      minPrice: minPrice1,
      maxPrice: maxPrice1,
      usdPrice: prices[position.token1.symbol],
      increasesEvents: position.events.liquidityIncreases,
      decreasesEvents: position.events.liquidityDecreases,
    })
    position.totalUsdValue = position.token0.usdValue.plus(position.token1.usdValue)
  })
}

const PositionsInfo = () => {
  const { address } = useContext(WalletContext);
  const [positions, setPositions] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (address) {
      const fetchPositionsData = async () => {
        const positions = await fetchPositions(address);

        setPositions(positions)
      };
      fetchPositionsData();

    }
  }, [address]);

  useEffect(() => {
    async function fetchData() {
      if (!positions.errors) {
        const tokens = positions.map((pos) => [pos.token0.symbol, pos.token1.symbol]).flat()

        const prices = await getPrice(tokens);

        await Promise.all(
          positions.map(async (pos) => await enrichPosition(pos, prices))
        )

        setPrices(prices);
      }
    }
    fetchData()

  }, [positions])

  return address
    ?
      <>
        <Dashboard positions={positions} />
        <PricesList prices={prices} />
        <PositionsList positions={positions} />
      </>
    : <div>Connect wallet</div>;
};

export default PositionsInfo;

PositionsList.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ])
}
