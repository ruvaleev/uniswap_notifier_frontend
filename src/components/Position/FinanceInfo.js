import React from 'react';
import PropTypes from 'prop-types';

import ExpandableRow from './ExpandableRow';
import Row from '__components/Row';
import moneyFormat from '__helpers/moneyFormat';
import { PRICE_PRECISION } from '__constants';

const FinanceInfo = ({ position }) => {
  const t0 = position.token0
  if (!t0.usdValue) { return }

  const t1 = position.token1

  const totalUsdValue = t0.usdValue.plus(t1.usdValue)
  const share0 = t0.usdValue.multipliedBy(100).dividedBy(totalUsdValue)
  const share1 = t1.usdValue.multipliedBy(100).dividedBy(totalUsdValue)

  return (
    <ExpandableRow title='Total USD value (No Fees)' value={moneyFormat(totalUsdValue)}>
      <div className="grid-item secondary text-base mr-1">Position has:</div>
      <Row
        title={`${t0.symbol}:`}
        value={t0.amount.toFixed()}
        addition={`(${moneyFormat(t0.usdValue)}) - ${share0.toFixed(2)}%`}
      />
      <Row
        title={`${t1.symbol}:`}
        value={t1.amount.toFixed()}
        addition={`(${moneyFormat(t1.usdValue)}) - ${share1.toFixed(2)}%`}
      />
      <Row title={`1 ${t0.symbol} costs ${t0.price.toFixed(PRICE_PRECISION)} of ${t1.symbol}`}/>
      <Row title={`1 ${t1.symbol} costs ${t1.price.toFixed(PRICE_PRECISION)} of ${t0.symbol}`}/>
    </ExpandableRow>
  )
};

export default FinanceInfo;

FinanceInfo.propTypes = {
  position: PropTypes.object.isRequired,
}
