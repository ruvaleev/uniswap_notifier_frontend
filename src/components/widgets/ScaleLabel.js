import React from 'react';
import PropTypes from 'prop-types';

import AmountDisplay from '__components/AmountDisplay';

const ScaleLabel = ({value, title, textStyle}) => {
  return (
    <>
      <AmountDisplay value={value} classNames={`text-4xl ${textStyle}`}/>
      <div className='flex mb-4 mt-2'>
        <div className={textStyle}>{title}</div>
      </div>
    </>
  )
};

export default ScaleLabel;

ScaleLabel.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  textStyle: PropTypes.string.isRequired,
}
