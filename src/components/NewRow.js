import React from 'react';
import PropTypes from 'prop-types';

import AmountDisplay from './AmountDisplay';

const Row = ({ title, subtitle, value, classNames = '' }) => (
  <div className={`grid-item flex flex-col font-avenir overflow-scroll ${classNames}`}>
    <div className='flex items-end justify-between'>
      <span className="text-base mr-1">{title}</span>
      <AmountDisplay value={value}/>
    </div>
    <div className='flex justify-start'>
      <span className="text-base text-gray">{subtitle}</span>
    </div>
  </div>
)

export default Row;

Row.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.string,
  classNames: PropTypes.string,
}
