import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import moneyFormat from '__helpers/moneyFormat';

const ImpermanentLossInfo = ({ position }) => {
  const t0 = position.token0
  const t1 = position.token1
  const totalHoldAmountUsd = t0.holdUsdValue + t1.holdUsdValue
  const impermanentLossUsd = t0.holdUsdValue + t1.holdUsdValue - position.totalUsdValue
  const depositedUsd = BigNumber(position.amountDepositedUSD)
  const impermanentLossPercentage = (impermanentLossUsd / depositedUsd) * 100
  return (
    position.token0.initialAmount && <>
      <div className="grid-item">Impremanent Loss info:</div>
      <div className="grid-item">Initial position consisted from:</div>
      <div className="grid-item">{t0.initialAmount.toFixed(8)} of {t0.initialAmount.symbol}</div>
      <div className="grid-item">{t1.initialAmount.toFixed(8)} of {t1.initialAmount.symbol}</div>
      <div className="grid-item">Initial position cost: {moneyFormat(depositedUsd)}</div>
      <div className="grid-item">{t0.symbol} current amount if hold: {moneyFormat(t0.holdUsdValue)}</div>
      <div className="grid-item">{t1.symbol} current amount if hold: {moneyFormat(t1.holdUsdValue)}</div>
      <div className="grid-item">Total value with hold would be: {moneyFormat(totalHoldAmountUsd)}</div>
      <div className="grid-item">Impermanent Loss USD: {moneyFormat(impermanentLossUsd)}</div>
      <div className="grid-item">Impermanent Loss: {impermanentLossPercentage.toFixed(4)}%</div>
    </>
  )
};

export default ImpermanentLossInfo;

ImpermanentLossInfo.propTypes = {
  position: PropTypes.object.isRequired
}
