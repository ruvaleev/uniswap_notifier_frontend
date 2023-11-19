import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PRICE_PRECISION } from '__constants';

const ProportionsScale = ({token0, token1, share0}) => {
  const scaleStyle = {
    width: `${share0}%`
  };

  return (
    <div className="flex grid-item items-center">
      <div className="token token-left secondary mr-2">{token0}</div>
      <div className="scale">
        <div className="current-tick" style={scaleStyle}></div>
      </div>
      <div className="token token-right secondary ml-2">{token1}</div>
    </div>
  )
}

const PriceBlock = ({ title, value }) => (
  <div className='flex flex-col width-30'>
    <span className='secondary text-sm'>{title}</span>
    <span className='overflow-scroll primary text-sm'>{value.toFixed(PRICE_PRECISION)}</span>
  </div>
)
const CurrentPriceInfo = ({ t0, t1 }) => {
  const [isToken0, switchToken] = useState(true);

  const tokenInfo = isToken0 ? t0 : t1

  return (
    <div data-testid='proportionsInfo' className='cursor-pointer' onClick={() => switchToken(!isToken0)}>
      <div className='text-center' data-testid='tokenLabel'>{tokenInfo.symbol}</div>
      <div className='flex flex-wrap justify-between text-center'>
        <PriceBlock title='Min Price:' value={tokenInfo.minPrice}/>
        <PriceBlock title='Current Price:' value={tokenInfo.price}/>
        <PriceBlock title='Max Price:' value={tokenInfo.maxPrice}/>
      </div>
    </div>
  )
}

const ProportionsInfo = ({ t0, t1 }) => {
  if (!t0.usdValue) { return }

  const totalUsdValue = t0.usdValue.plus(t1.usdValue)
  const share0 = t0.usdValue.multipliedBy(100).dividedBy(totalUsdValue)

  return (
    <div className='my-4 py-4 relative top-bottom-bordered'>
      <ProportionsScale token0={t0.symbol} token1={t1.symbol} share0={share0}/>
      <CurrentPriceInfo t0={t0} t1={t1} />
    </div>
  )
};

export default ProportionsInfo;

ProportionsInfo.propTypes = {
  t0: PropTypes.object.isRequired,
  t1: PropTypes.object.isRequired,
}

CurrentPriceInfo.propTypes = {
  t0: PropTypes.object.isRequired,
  t1: PropTypes.object.isRequired,
}

ProportionsScale.propTypes = {
  token0: PropTypes.string.isRequired,
  token1: PropTypes.string.isRequired,
  share0: PropTypes.object.isRequired
}

PriceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired
}
