import React from 'react';
import PropTypes from 'prop-types';

import AmountDisplay from '__components/AmountDisplay';

const Row = ({ title, value, classNames = '' }) => (
  <div className={`grid-item flex flex-col font-avenir overflow-scroll w-full ${classNames}`}>
    <div className='flex items-end justify-between'>
      <span className="text-base">{title}</span>
      <AmountDisplay value={value} classNames='text-base'/>
    </div>
  </div>
)

export default Row;

Row.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classNames: PropTypes.string,
}
