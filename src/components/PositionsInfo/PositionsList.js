import React from 'react';
import PropTypes from 'prop-types';

import ErrorsList from '__components/ErrorsList';
import Position from '__components/Position';

const PositionsList = ({ positions, prices, completionCallback }) => {
  return positions.errors
    ? <ErrorsList errors={positions.errors} />
    : <div className='flex flex-wrap justify-between positions-list text-base' data-testid='positions-list'>
        {positions && positions.map((position) => (
          <Position key={position.id} position={position} prices={prices} completionCallback={completionCallback} />
        ))}
      </div>
}

export default PositionsList;

PositionsList.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ]),
  prices: PropTypes.object.isRequired,
  completionCallback: PropTypes.func.isRequired
}
