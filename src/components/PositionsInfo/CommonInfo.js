import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';
import { PRICE_PRECISION } from '__constants';

const ProportionsScale = ({token0, token1, share0}) => {
  const scaleStyle = {
    width: `${share0}%`
  };

  return (
    <div className="grid-item scale-wrapper">
      <div className="token token-left secondary mr-2">{token0}</div>
      <div className="scale">
        <div className="current-tick" style={scaleStyle}></div>
      </div>
      <div className="token token-right secondary ml-2">{token1}</div>
    </div>
  )
}

const CommonInfo = ({ position }) => {
  const t0 = position.token0
  if (!t0.usdValue) { return }

  const t1 = position.token1

  const totalUsdValue = t0.usdValue.plus(t1.usdValue)
  const share0 = t0.usdValue.multipliedBy(100).dividedBy(totalUsdValue)
  const share1 = t1.usdValue.multipliedBy(100).dividedBy(totalUsdValue)

  return (
    <>
      <div className="grid-item">
        <div className="grid-item secondary">{position.id}</div>
        <div className="grid-item secondary">{Math.floor(position.daysAge)} days</div>
        <div className="grid-item secondary text-xs">
          1 {t0.symbol} costs {t0.price.toFixed(PRICE_PRECISION)} of {t1.symbol}
        </div>
        <div className="grid-item secondary text-xs">
          1 {t1.symbol} costs {t1.price.toFixed(PRICE_PRECISION)} of {t0.symbol}
        </div>
      </div>
      <div className="grid-item leading-4 my-2">
        <div className="grid-item secondary text-sm">Position has:</div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t0.symbol}: </span>
          <span className="leading-4 primary text-base">{t0.amount.toFixed()}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(t0.usdValue)}) - {share0.toFixed(2)}%</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t1.symbol}: </span>
          <span className="leading-4 primary text-base">{t1.amount.toFixed()}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(t1.usdValue)}) - {share1.toFixed(2)}%</span>
        </div>
        <ProportionsScale token0={t0.symbol} token1={t1.symbol} share0={share0}/>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">Total USD value (No Fees): </span>
          <span className="leading-4 primary text-base">{moneyFormat(totalUsdValue)}</span>
        </div>
      </div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}

ProportionsScale.propTypes = {
  token0: PropTypes.string.isRequired,
  token1: PropTypes.string.isRequired,
  share0: PropTypes.object.isRequired,
}
