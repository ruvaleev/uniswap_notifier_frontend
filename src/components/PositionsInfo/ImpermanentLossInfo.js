import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import moneyFormat from '__helpers/moneyFormat';

const WaitPleaseMessage = () => (
  <div className="grid-item leading-4 my-2">
    <div className="grid-item mt-2 secondary text-sm">Impremanent Loss info:</div>
    <div className="grid-item secondary text-sm">Loading...</div>
  </div>
)

const ImpermanentLossInfo = ({ position }) => {
  const t0 = position.token0
  const t1 = position.token1
  if (!(t0.holdUsdValue && t0.holdUsdValue)) { return <WaitPleaseMessage/> }

  const totalHoldAmountUsd = t0.holdUsdValue.plus(t1.holdUsdValue)
  const impermanentLossUsd = t0.holdUsdValue.plus(t1.holdUsdValue).minus(position.totalUsdValue)
  const depositedUsd = BigNumber(position.amountDepositedUSD)
  const impermanentLossPercentage = impermanentLossUsd.multipliedBy(100).dividedBy(totalHoldAmountUsd)

  return (
      <div className="grid-item leading-4 my-2">
        <div className="grid-item mb-2 secondary text-sm">Impremanent Loss info:</div>
        <div className="grid-item secondary text-sm">Initial position proportion:</div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t0.symbol}: </span>
          <span className="leading-4 primary text-base">{t0.initialAmount.toFixed(8)}</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t1.symbol}: </span>
          <span className="leading-4 primary text-base">{t1.initialAmount.toFixed(8)}</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">Initial position cost: </span>
          <span className="leading-4 primary text-base">{moneyFormat(depositedUsd)}</span>
        </div>
        <div className="grid-item mt-2 secondary text-sm">With hold strategy current USD amounts would be:</div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t0.symbol}: </span>
          <span className="leading-4 primary text-base">{moneyFormat(t0.holdUsdValue)}</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t1.symbol}: </span>
          <span className="leading-4 primary text-base">{moneyFormat(t1.holdUsdValue)}</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">Total value (HODL): </span>
          <span className="leading-4 primary text-base">{moneyFormat(totalHoldAmountUsd)}</span>
        </div>
        <div className="grid-item mt-2">
          <span className="leading-4 secondary text-sm">Impermanent Loss USD: </span>
          <span className="leading-4 primary text-base">{moneyFormat(impermanentLossUsd)}</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">Impermanent Loss: </span>
          <span className="leading-4 primary text-base">{impermanentLossPercentage.toFixed(4)}%</span>
        </div>
      </div>
  )
};

export default ImpermanentLossInfo;

ImpermanentLossInfo.propTypes = {
  position: PropTypes.object.isRequired
}
