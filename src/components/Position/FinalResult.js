import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import moneyFormat from '__helpers/moneyFormat';
import { HUNDRED, PERCENT_PRECISION, PRICE_PRECISION, YEAR_DAYS, ZERO } from '__constants';

const FinalResult = ({ position }) => {
  if (!position.totalUsdValue) { return }

  const daysAge = BigNumber(position.daysAge)
  // Profit in USD
  const claimedFeesUsd = position.feesClaims.reduce((acc, claim) => acc.plus(claim.usdAmount0).plus(claim.usdAmount1), ZERO)
  const unclaimedFeesUsd = position.token0.usdFees.plus(position.token1.usdFees)
  const totalFeesUsd = claimedFeesUsd.plus(unclaimedFeesUsd)

  // Profit in Coins
  const claimedFeesToken0 = position.feesClaims.reduce((acc, claim) => acc.plus(claim.amount0), ZERO)
  const unclaimedFeesToken0 = position.token0.fees
  const token0Earned = claimedFeesToken0.plus(unclaimedFeesToken0)

  const claimedFeesToken1 = position.feesClaims.reduce((acc, claim) => acc.plus(claim.amount1), ZERO)
  const unclaimedFeesToken1 = position.token1.fees
  const token1Earned = claimedFeesToken1.plus(unclaimedFeesToken1)

  // Profit in percents
  const initialLiquidity = position.events.liquidityIncreases[0].liquidity
  const liquidityChangedCoeff = position.liquidity / initialLiquidity
  const currentFeesProfit = HUNDRED.multipliedBy(unclaimedFeesUsd).dividedBy(
    BigNumber(position.amountDepositedUSD).multipliedBy(liquidityChangedCoeff)
  )
  const claimedFeesProfit = position.feesClaims.reduce((acc, claim) => acc.plus(claim.percentOfDeposit), ZERO)
  const totalFeesProfitPercent = currentFeesProfit.plus(claimedFeesProfit)
  const expectedApr = YEAR_DAYS.multipliedBy(totalFeesProfitPercent).dividedBy(daysAge)

  // Profit considering IL:
  const totalValueWithFeesUsd = position.totalUsdValue.plus(totalFeesUsd)
  const totalHoldUsd = position.token0.holdUsdValue.plus(position.token1.holdUsdValue)
  const totalEarnedConsideringIlUsd = totalValueWithFeesUsd.minus(totalHoldUsd)
  const totalEarnedConsideringIl = totalEarnedConsideringIlUsd.multipliedBy(HUNDRED).dividedBy(totalHoldUsd)

  return (
    <div className="grid-item leading-4 my-2">
      <div className="grid-item secondary text-sm">Final result:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit In USD: </span>
        <span className="leading-4 primary text-base">{moneyFormat(totalFeesUsd)}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{position.token0.symbol} Earned: </span>
        <span className="leading-4 primary text-base">{token0Earned.toFixed(PRICE_PRECISION)}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{position.token1.symbol} Earned: </span>
        <span className="leading-4 primary text-base">{token1Earned.toFixed(PRICE_PRECISION)}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit in Fees % (by USD for {position.daysAge.toFixed(0)} days): </span>
        <span className="leading-4 primary text-base">{totalFeesProfitPercent.toFixed(PERCENT_PRECISION)}%</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Expected APR in Fees %: </span>
        <span className="leading-4 primary text-base">{expectedApr.toFixed(PERCENT_PRECISION)}%</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit considering IL: </span>
        <span className="leading-4 primary text-base">{moneyFormat(totalEarnedConsideringIlUsd)}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Profit % considering IL: </span>
        <span className="leading-4 primary text-base">{totalEarnedConsideringIl.toFixed(PERCENT_PRECISION)}%</span>
      </div>
    </div>
  )
};

export default FinalResult;

FinalResult.propTypes = {
  position: PropTypes.object.isRequired,
}
