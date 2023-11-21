import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import ExpandButton from '__components/buttons/ExpandButton';
import ProjectedILInfo from '__components/ProjectedILInfo';
import Row from '__components/Row';
import { PERCENT_PRECISION } from '__constants';
import moneyFormat from '__helpers/moneyFormat';
import LiquidityChanges from './LiquidityChanges';

const WaitPleaseMessage = () => (
  <div className="grid-item leading-4 my-2">
    <Row title='Impremanent Loss info:'/>
    <Row title='Loading...'/>
  </div>
)

const ImpermanentLossInfo = ({ position }) => {
  const detailsRef = createRef();

  const t0 = position.token0
  const t1 = position.token1
  if (!(t0.holdUsdValue && t0.holdUsdValue)) { return <WaitPleaseMessage/> }

  const totalHoldAmountUsd = t0.holdUsdValue.plus(t1.holdUsdValue)
  const impermanentLossUsd = t0.holdUsdValue.plus(t1.holdUsdValue).minus(position.totalUsdValue)
  const depositedUsd = BigNumber(position.amountDepositedUSD)
  const impermanentLossPercentage = impermanentLossUsd.multipliedBy(100).dividedBy(totalHoldAmountUsd)

  return (
    <div>
      <div className="flex grid-item items-center leading-4">
        <Row
          title='Impermanent Loss:'
          value={`${impermanentLossPercentage.toFixed(PERCENT_PRECISION)}%`}
          addition={`(${moneyFormat(impermanentLossUsd)})`}
        />
        <ExpandButton relRef={detailsRef}/>
      </div>
      <div ref={detailsRef} className="grid-item leading-4">
        <Row title='Initial position proportion:'/>
        <Row title={`${t0.symbol}:`} value={t0.initialAmount.toFixed(8)}/>
        <Row title={`${t1.symbol}:`} value={t1.initialAmount.toFixed(8)}/>
        <Row title='Initial position cost:' value={moneyFormat(depositedUsd)}/>

        <LiquidityChanges changes={position.liquidityChanges} />

        <Row title='With hold strategy current USD amounts would be:'/>
        <Row title={`${t0.symbol}:`} value={moneyFormat(t0.holdUsdValue)}/>
        <Row title={`${t1.symbol}:`} value={moneyFormat(t1.holdUsdValue)}/>
        <Row title='Total value (HODL):' value={moneyFormat(totalHoldAmountUsd)}/>

        <ProjectedILInfo position={position}/>
      </div>
    </div>
  )
};

export default ImpermanentLossInfo;

ImpermanentLossInfo.propTypes = {
  position: PropTypes.object.isRequired
}
