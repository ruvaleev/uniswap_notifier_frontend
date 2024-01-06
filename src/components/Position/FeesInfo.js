import React from 'react';
import PropTypes from 'prop-types';

import Row from '__components/Row';
import ExpandableRow from './ExpandableRow';
import dateWithHyphens from '__helpers/dateWithHyphens';
import moneyFormat from '__helpers/moneyFormat';
import { ZERO } from '__constants';

const Collect = ({ collect, t0Symbol, t1Symbol }) => (
  <>
    <Row title={`${dateWithHyphens(collect.timestamp * 1000)}:`}/>
    <Row title={`${t0Symbol}:`} value={collect.amount0.toFixed()} addition={`(${moneyFormat(collect.usdAmount0)})`}/>
    <Row title={`${t1Symbol}:`} value={collect.amount1.toFixed()} addition={`(${moneyFormat(collect.usdAmount1)})`}/>
  </>
)

const ClaimedFees = ({ usdAmount, feesClaims, t0Symbol, t1Symbol }) => {
  return (
    <ExpandableRow title='Claimed Fees' value={moneyFormat(usdAmount)} isExpandable={feesClaims.length > 0}>
      {
        feesClaims.map((collect, index) => (
          <Collect key={index} collect={collect} t0Symbol={t0Symbol} t1Symbol={t1Symbol} />
        ))
      }
    </ExpandableRow>
  )
}

const UnclaimedFees = ({ token0, token1 }) => {
  return (
    <ExpandableRow title='Unclaimed Fees Earned' value={moneyFormat(token0.usdFees.plus(token1.usdFees))}>
      <Row title={`${token0.symbol}:`} value={token0.fees.toFixed()} addition={`(${moneyFormat(token0.usdFees)})`}/>
      <Row title={`${token1.symbol}:`} value={token1.fees.toFixed()} addition={`(${moneyFormat(token1.usdFees)})`}/>
    </ExpandableRow>
  )
}

const calculateClaimedFees = (feesClaims) => (
  feesClaims
  ? feesClaims.reduce((acc, claim) => acc.plus(claim.usdAmount0).plus(claim.usdAmount1), ZERO)
  : ZERO
)

const FeesInfo = ({token0, token1, feesClaims}) => {
  if (!token0.fees) { return }
  const claimedFees = calculateClaimedFees(feesClaims)

  return (
    <>
      <ClaimedFees usdAmount={claimedFees} feesClaims={feesClaims} t0Symbol={token0.symbol} t1Symbol={token1.symbol} />
      <UnclaimedFees token0={token0} token1={token1} />
    </>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
  feesClaims: PropTypes.arrayOf(PropTypes.object),
}

Collect.propTypes = {
  collect: PropTypes.object.isRequired,
  t0Symbol: PropTypes.string.isRequired,
  t1Symbol: PropTypes.string.isRequired,
}

ClaimedFees.propTypes = {
  usdAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  feesClaims: PropTypes.arrayOf(PropTypes.object).isRequired,
  t0Symbol: PropTypes.string.isRequired,
  t1Symbol: PropTypes.string.isRequired,
}

UnclaimedFees.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
