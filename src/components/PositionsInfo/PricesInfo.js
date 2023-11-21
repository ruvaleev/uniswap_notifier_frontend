import React from 'react';
import PropTypes from 'prop-types';

const PricesInfo = ({ currency, price }) => {
  return (
    <div className="grid-item mr-2 text-sm mr-2">
      <span className="secondary">{currency}: </span>
      <span className="primary">${price}</span>
    </div>
  )
};

export default PricesInfo;

PricesInfo.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
