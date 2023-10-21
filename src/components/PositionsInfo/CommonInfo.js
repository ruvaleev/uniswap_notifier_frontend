import React from 'react';
import PropTypes from 'prop-types';

import moneyFormat from '__helpers/moneyFormat';

const CommonInfo = ({ position }) => {
  const t0 = position.token0
  const t1 = position.token1
  return (
    <>
      <div className="grid-item">{position.id}</div>
      <div className="grid-item">1 {t0.symbol} costs {t1.price} of {t1.symbol}</div>
      <div className="grid-item">1 {t1.symbol} costs {t0.price} of {t0.symbol}</div>
      <div className="grid-item">Position has:</div>
      <div className="grid-item">{t0.amount} of {t0.symbol} ({moneyFormat(t0.usdValue)})</div>
      <div className="grid-item">{t1.amount} of {t1.symbol} ({moneyFormat(t1.usdValue)})</div>
      <div className="grid-item">Total value: {moneyFormat(position.totalUsdValue)}</div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}
