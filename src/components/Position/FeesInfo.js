import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import ExpandButton from '__components/buttons/ExpandButton';
import Row from '__components/Row';
import dateWithHyphens from '__helpers/dateWithHyphens';
import moneyFormat from '__helpers/moneyFormat';

const Collect = ({ collect, t0Symbol, t1Symbol }) => (
  <>
    <Row title={`${dateWithHyphens(collect.timestamp * 1000)}:`}/>
    <Row title={`${t0Symbol}:`} value={collect.amount0.toFixed()} addition={`(${moneyFormat(collect.usdAmount0)})`}/>
    <Row title={`${t1Symbol}:`} value={collect.amount1.toFixed()} addition={`(${moneyFormat(collect.usdAmount1)})`}/>
  </>
)

const ClaimedFees = ({ feesClaims, t0Symbol, t1Symbol }) => {
  const claimedFeesRef = createRef();
  const usdAmount = feesClaims.reduce((acc, claim) => acc.plus(claim.usdAmount0).plus(claim.usdAmount1), BigNumber(0))

  return (
    <>
      <div className="flex grid-item items-center">
        <Row title='Claimed Fees:' value={moneyFormat(usdAmount)}/>
        <ExpandButton relRef={claimedFeesRef}/>
      </div>
      <div ref={claimedFeesRef}>
        {
          feesClaims.map((collect, index) => (
            <Collect key={index} collect={collect} t0Symbol={t0Symbol} t1Symbol={t1Symbol} />
          ))
        }
      </div>
    </>
  )
}

const UnclaimedFees = ({ token0, token1 }) => {
  const unclaimedFeesRef = createRef();

  return (
    <>
      <div className="flex grid-item items-center">
        <Row title='Unclaimed Fees Earned:' value={moneyFormat(token0.usdFees.plus(token1.usdFees))}/>
        <ExpandButton relRef={unclaimedFeesRef}/>
      </div>
      <div ref={unclaimedFeesRef}>
        <Row title={`${token0.symbol}:`} value={token0.fees.toFixed()} addition={`(${moneyFormat(token0.usdFees)})`}/>
        <Row title={`${token1.symbol}:`} value={token1.fees.toFixed()} addition={`(${moneyFormat(token1.usdFees)})`}/>
      </div>
    </>
  )
}

const FeesInfo = ({token0, token1, feesClaims}) => {
  return (
    token0.fees &&
      <div className="grid-item leading-4">
        <UnclaimedFees token0={token0} token1={token1} />
        <ClaimedFees feesClaims={feesClaims} t0Symbol={token0.symbol} t1Symbol={token1.symbol} />
      </div>
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
  feesClaims: PropTypes.arrayOf(PropTypes.object).isRequired,
  t0Symbol: PropTypes.string.isRequired,
  t1Symbol: PropTypes.string.isRequired,
}

UnclaimedFees.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
