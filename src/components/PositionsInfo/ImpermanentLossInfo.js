import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const ImpermanentLossInfo = ({
  depositedUsd, token0, token1, initialAmount0, initialAmount1, holdUsd0, holdUsd1, totalValue
}) => {
  const totalHoldAmountUsd = holdUsd0 + holdUsd1
  const impermanentLossUsd = holdUsd0 + holdUsd1 - totalValue
  const impermanentLossPercentage = (impermanentLossUsd / depositedUsd) * 100
  return (
    <>
      <div className="grid-item">Impremanent Loss info:</div>
      <div className="grid-item">Initial position consisted from:</div>
      <div className="grid-item">{initialAmount0.toFixed(8)} of {token0}</div>
      <div className="grid-item">{initialAmount1.toFixed(8)} of {token1}</div>
      <div className="grid-item">Initial position cost: {moneyFormat(depositedUsd)}</div>
      <div className="grid-item">{token0} current amount if hold: {moneyFormat(holdUsd0)}</div>
      <div className="grid-item">{token1} current amount if hold: {moneyFormat(holdUsd1)}</div>
      <div className="grid-item">Total value with hold would be: {moneyFormat(totalHoldAmountUsd)}</div>
      <div className="grid-item">Impermanent Loss USD: {moneyFormat(impermanentLossUsd)}</div>
      <div className="grid-item">Impermanent Loss: {impermanentLossPercentage.toFixed(4)}%</div>
    </>
  )
};

export default ImpermanentLossInfo;

ImpermanentLossInfo.propTypes = {
  depositedUsd: PropTypes.object.isRequired,
  token0: PropTypes.string.isRequired,
  token1: PropTypes.string.isRequired,
  initialAmount0: PropTypes.object.isRequired,
  initialAmount1: PropTypes.object.isRequired,
  holdUsd0: PropTypes.number.isRequired,
  holdUsd1: PropTypes.number.isRequired,
  totalValue: PropTypes.number.isRequired
}
