import React from 'react';
import PropTypes from 'prop-types';

import dateWithHyphens from '__helpers/dateWithHyphens';
import moneyFormat from '__helpers/moneyFormat';

const Collect = ({ collect, token0Symbol, token1Symbol }) => (
  <>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm"> ({dateWithHyphens(collect.timestamp * 1000)}):</span>
    </div>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">{token0Symbol}: </span>
      <span className="leading-4 primary text-base">{collect.amount0.toFixed()}</span>
      <span className="leading-4 secondary text-sm"> ({moneyFormat(collect.usdAmount0)})</span>
    </div>
    <div className="grid-item">
      <span className="leading-4 secondary text-sm">{token1Symbol}: </span>
      <span className="leading-4 primary text-base">{collect.amount1.toFixed()}</span>
      <span className="leading-4 secondary text-sm"> ({moneyFormat(collect.usdAmount1)})</span>
    </div>
  </>
)

const ClaimedFees = ({ feesClaims, token0Symbol, token1Symbol }) => (
  <>
    <div className="grid-item secondary text-sm">Claimed Fees:</div>
    {
      feesClaims.map((collect, index) => (
        <Collect key={index} collect={collect} token0Symbol={token0Symbol} token1Symbol={token1Symbol} />
      ))
    }
  </>
)

const UnclaimedFees = ({ token0, token1 }) => {
  return (
    <>
      <div className="grid-item secondary text-sm">Unclaimed Fees Earned:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{token0.symbol}: </span>
        <span className="leading-4 primary text-base">{token0.fees.toFixed()}</span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees)})</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{token1.symbol}: </span>
        <span className="leading-4 primary text-base">{token1.fees.toFixed()}</span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token1.usdFees)})</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Total Unclaimed Fees: </span>
        <span className="leading-4 secondary text-sm"> ({moneyFormat(token0.usdFees.plus(token1.usdFees))})</span>
      </div>
    </>
  )
}

const FeesInfo = ({token0, token1, feesClaims}) => {
  return (
    token0.fees &&
      <div className="grid-item leading-4 my-2">
        <UnclaimedFees token0={token0} token1={token1} />
        <ClaimedFees feesClaims={feesClaims} token0Symbol={token0.symbol} token1Symbol={token1.symbol} />
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
  token0Symbol: PropTypes.string.isRequired,
  token1Symbol: PropTypes.string.isRequired,
}

ClaimedFees.propTypes = {
  feesClaims: PropTypes.arrayOf(PropTypes.object).isRequired,
  token0Symbol: PropTypes.string.isRequired,
  token1Symbol: PropTypes.string.isRequired,
}

UnclaimedFees.propTypes = {
  token0: PropTypes.object.isRequired,
  token1: PropTypes.object.isRequired,
}
