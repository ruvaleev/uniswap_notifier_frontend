import React from 'react';
import PropTypes from 'prop-types';

const PricesInfo = ({ currency, price }) => {
  return <div>{currency}: ${price}</div>
};

export default PricesInfo;

PricesInfo.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
