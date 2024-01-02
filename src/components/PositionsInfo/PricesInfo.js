import React from 'react';
import PropTypes from 'prop-types';

import AmountDisplay from '__components/AmountDisplay';
import TokenIcon from '__components/TokenIcon';

const PricesInfo = ({ currency, price }) => {
  return (
    <div className="flex grid-container items-center justify-between py-9 text-sm">
      <TokenIcon name={currency} />
      <span className="primary">{currency}</span>
      <AmountDisplay value={`$${price}`}/>
    </div>
  )
};

export default PricesInfo;

PricesInfo.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
