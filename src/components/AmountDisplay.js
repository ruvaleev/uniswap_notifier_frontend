import React from 'react';
import PropTypes from 'prop-types';

const AmountDisplay = ({ value }) => (
  <span className="text-2xl text-green mr-1 font-number">{value}</span>
)

export default AmountDisplay;

AmountDisplay.propTypes = {
  value: PropTypes.string
}
