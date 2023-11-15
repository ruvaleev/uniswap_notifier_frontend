import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PERCENT_PRECISION } from '__constants';
import getILData from '__services/getILData';

const Slider = ({ min, max, value, onChange }) => {
  return (
    <input
      type="range"
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
      <Slider min={min} max={max} value={value} onChange={handleChange}/>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">Tick: </span>
        <span className="leading-4 primary text-base">{value}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">IL: </span>
        <span className="leading-4 primary text-base">{ilData.impermanentLoss.toFixed(PERCENT_PRECISION)}%</span>
      </div>
      <div className="grid-item secondary text-sm">Proportions:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{t0Symbol}: </span>
        <span className="leading-4 primary text-base">{ilData.tickProportions.amount0.toFixed()}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{t1Symbol}: </span>
        <span className="leading-4 primary text-base">{ilData.tickProportions.amount1.toFixed()}</span>
      </div>
      <div className="grid-item secondary text-sm">Prices:</div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{t0Symbol}: </span>
        <span className="leading-4 primary text-base">{ilData.tickPrices.price0.toFixed()}</span>
      </div>
      <div className="grid-item">
        <span className="leading-4 secondary text-sm">{t1Symbol}: </span>
        <span className="leading-4 primary text-base">{ilData.tickPrices.price1.toFixed()}</span>
      </div>
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

