import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const CommonInfo = ({ position }) => {
  const t0 = position.token0
  const t1 = position.token1
  return (
    <>
      <div className="grid-item">
        <div className="grid-item secondary">{position.id}</div>
        <div className="grid-item secondary text-xs">1 {t0.symbol} costs {t1.price} of {t1.symbol}</div>
        <div className="grid-item secondary text-xs">1 {t1.symbol} costs {t0.price} of {t0.symbol}</div>
      </div>
      <div className="grid-item leading-4 my-2">
        <div className="grid-item secondary text-sm">Position has:</div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t0.symbol}: </span>
          <span className="leading-4 primary text-base">{t0.amount}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(t0.usdValue)})</span>
        </div>
        <div className="grid-item">
          <span className="leading-4 secondary text-sm">{t1.symbol}: </span>
          <span className="leading-4 primary text-base">{t1.amount}</span>
          <span className="leading-4 secondary text-sm"> ({moneyFormat(t1.usdValue)})</span>
        </div>
      </div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}
