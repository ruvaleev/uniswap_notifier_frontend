import React from 'react';
import PropTypes from 'prop-types';

const Scale = ({ value, scaleClassNames = '', valueClassNames = '' }) => {
  const borderRadius = value >= 100 ? '0.5rem' : '0.5rem 0 0 0.5rem'
  const scaleStyle = {
    width: `${Math.min(value, 100)}%`,
    borderRadius: borderRadius
  }
  return (
    <div className={`scale ${scaleClassNames}`}>
      <div className={`scale-value ${valueClassNames}`} style={scaleStyle}></div>
    </div>
  )
}

export default Scale;

Scale.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
  scaleClassNames: PropTypes.string,
  valueClassNames: PropTypes.string,
}
