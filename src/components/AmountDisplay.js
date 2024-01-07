import React from 'react';
import PropTypes from 'prop-types';

const AmountDisplay = ({ value, classNames = '' }) => (
  <span className={`font-number inline-block text-2xl text-green mr-1 ${classNames}`}>{value}</span>
)

export default AmountDisplay;

AmountDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  classNames: PropTypes.string
}
