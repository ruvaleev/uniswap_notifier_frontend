import React from 'react';
import PropTypes from 'prop-types';

import AmountDisplay from '__components/AmountDisplay';
import TokenIcon from '__components/TokenIcon';

const PricesInfo = ({ currency, price }) => {
  return (
    <div className="flex grid-container items-center justify-between mb-2 py-4 text-sm">
      <TokenIcon name={currency} />
      <span className='mr-auto ml-20'>{currency}</span>
      <AmountDisplay value={`$${price}`}/>
    </div>
  )
};

export default PricesInfo;

PricesInfo.propTypes = {
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
