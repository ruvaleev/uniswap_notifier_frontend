import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PRICE_PRECISION } from '__constants';
import TokenIcon from '__components/TokenIcon';
import Scale from '__components/Scale';

const Token = ({ token }) => (
  <div className='flex flex-col items-center token-icon'>
    <TokenIcon name={token} classNames='mb-3'/>
    {token}
  </div>
)

const ProportionsScale = ({token0, token1, share0}) => {
  return (
    <div className="flex justify-between grid-item items-center mb-5">
      <Token token={token0}/>
      <Scale value={+share0} scaleClassNames='mx-6' valueClassNames='bg-green'/>
      <Token token={token1}/>
    </div>
  )
}

const PriceBlock = ({ title, value }) => (
  <div className='flex flex-col justify-between width-30'>
    <span>{title}</span>
    <span className='font-number overflow-scroll text-green'>{value.toFixed(PRICE_PRECISION)}</span>
  </div>
)
const CurrentPriceInfo = ({ t0, t1 }) => {
  const [isToken0, switchToken] = useState(true);

  const tokenInfo = isToken0 ? t0 : t1

  return (
    <div data-testid='proportionsInfo' className='cursor-pointer' onClick={() => switchToken(!isToken0)}>
      <div className='text-center' data-testid='tokenLabel'>{tokenInfo.symbol}</div>
      <div className='flex flex-wrap justify-between text-center'>
        <PriceBlock title='Min Price' value={tokenInfo.minPrice}/>
        <PriceBlock title='Current Price' value={tokenInfo.price}/>
        <PriceBlock title='Max Price' value={tokenInfo.maxPrice}/>
      </div>
    </div>
  )
}

const ProportionsInfo = ({ t0, t1 }) => {
  if (!t0.usdValue) { return }

  const totalUsdValue = t0.usdValue.plus(t1.usdValue)
  const share0 = t0.usdValue.multipliedBy(100).dividedBy(totalUsdValue)

  return (
    <div className='relative mb-7'>
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

Token.propTypes = {
  token: PropTypes.string.isRequired
}
