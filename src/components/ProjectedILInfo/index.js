import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Row from '__components/Row';
import { PERCENT_PRECISION } from '__constants';
import getILData from '__services/getILData';

const Slider = ({ min, max, value, onChange }) => {
  return (
    <input
      type="range"
      className='w-full styled-slider'
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  )
}

function ProjectedIlInfo({ position }) {
  const min = position.tickLower
  const max = position.tickUpper
  const liquidity = position.liquidity
  const decimals0 = position.token0.decimals
  const decimals1 = position.token1.decimals
  const initialTick = position.initialTick

  const t0Symbol = position.token0.symbol
  const t1Symbol = position.token1.symbol

  const [value, setValue] = useState(position.pool.tick);
  const [ilData, setIlData] = useState(
    getILData(position.pool.tick, initialTick, min, max, liquidity, decimals0, decimals1)
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    setIlData(
      getILData(e.target.value, initialTick, min, max, liquidity, decimals0, decimals1)
    )
  };

  return (
    <div className="grid-item leading-4 my-2">
      <div className="grid-item secondary">Projected IL:</div>
      <Slider min={min} max={max} value={value} onChange={handleChange}/>
      <Row title={'Tick:'} value={value}/>
      <Row title={'IL:'} value={`${ilData.impermanentLoss.toFixed(PERCENT_PRECISION)}%`}/>

      <div className="grid-item secondary">Proportions:</div>
      <Row title={`${t0Symbol}:`} value={ilData.tickProportions.amount0.toFixed()}/>
      <Row title={`${t1Symbol}:`} value={ilData.tickProportions.amount1.toFixed()}/>

      <div className="grid-item secondary">Prices:</div>
      <Row title={`${t0Symbol}:`} value={ilData.tickPrices.price0.toFixed()}/>
      <Row title={`${t1Symbol}:`} value={ilData.tickPrices.price1.toFixed()}/>
    </div>
  );
}

export default ProjectedIlInfo;

ProjectedIlInfo.propTypes = {
  position: PropTypes.object.isRequired
}

Slider.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

