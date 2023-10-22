import React from 'react';
import PropTypes from 'prop-types';

import PricesInfo from './PricesInfo';

const PricesList = ({ prices }) => {
  return (
    <div className='grid-container flex' data-testid='prices-list'>
      {
        Object.keys(prices).map((cur) => (
          <PricesInfo key={cur} currency={cur} price={prices[cur]}/>
        ))
      }
    </div>
  )
}

export default PricesList;

PricesList.propTypes = {
  prices: PropTypes.object.isRequired
}
