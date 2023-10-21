import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import { WalletContext } from '__contexts/WalletContext';
import getFees from '__services/getFees';
import getPool from '__services/getPool';
import getPrice from '__services/getPrice';
import getTokenAmounts from '__services/getTokenAmounts';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';
import fetchPositions from '__services/graph/fetchPositions';
import PositionsList from './PositionsList';
import PricesList from './PricesList';
import './styles.css';

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

  const enrichTokenInfo = ({ tokenInfo, amount, initialAmount, fees, price, usdPrice }) => {
    tokenInfo.amount = amount,
    tokenInfo.initialAmount = initialAmount
    tokenInfo.fees = fees
    tokenInfo.price = price
    tokenInfo.usdPrice = usdPrice
    tokenInfo.usdValue = amount * usdPrice
    tokenInfo.usdFees = fees * usdPrice
    tokenInfo.holdUsdValue = initialAmount * usdPrice
  }

  enrichTokenInfo({
    tokenInfo: position.token0,
    amount: amount0,
    initialAmount: BigNumber(position.depositedToken0),
    fees: fees.fees0,
    price: price0,
    usdPrice: prices[position.token0.symbol],
  })

  enrichTokenInfo({
    tokenInfo: position.token1,
    amount: amount1,
    initialAmount: BigNumber(position.depositedToken1),
    fees: fees.fees1,
    price: price1,
    usdPrice: prices[position.token1.symbol],
  })
  position.totalUsdValue = position.token0.usdValue + position.token1.usdValue
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
