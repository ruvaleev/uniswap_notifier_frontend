import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import ExpandableRow from './ExpandableRow';
import Row from '__components/Row';
import moneyFormat from '__helpers/moneyFormat';
import LiquidityChanges from './LiquidityChanges';
import getPositionIL from '__services/getPositionIL';

const ImpermanentLossInfo = ({ position }) => {
  const { token0: t0, token1: t1 } = position
  if (!t0.holdUsdValue) { return }

  const { usd } = getPositionIL(position)
  const depositedUsd = BigNumber(position.amountDepositedUSD)
  const totalHoldAmountUsd = t0.holdUsdValue.plus(t1.holdUsdValue)

  return (
    <>
      <ExpandableRow title='Impermanent Loss' value={moneyFormat(usd)}>
        <Row title='Initial position proportion:'/>
        <Row title={`${t0.symbol}:`} value={t0.initialAmount.toFixed(8)}/>
        <Row title={`${t1.symbol}:`} value={t1.initialAmount.toFixed(8)}/>
        <Row title='Initial position cost:' value={moneyFormat(depositedUsd)}/>

        <LiquidityChanges changes={position.liquidityChanges} />

        <Row title='With hold strategy current USD amounts would be:'/>
        <Row title={`${t0.symbol}:`} value={moneyFormat(t0.holdUsdValue)}/>
        <Row title={`${t1.symbol}:`} value={moneyFormat(t1.holdUsdValue)}/>
        <Row title='Total value (HODL):' value={moneyFormat(totalHoldAmountUsd)}/>
      </ExpandableRow>
    </>
  )
};

export default ImpermanentLossInfo;

ImpermanentLossInfo.propTypes = {
  position: PropTypes.object.isRequired
}
