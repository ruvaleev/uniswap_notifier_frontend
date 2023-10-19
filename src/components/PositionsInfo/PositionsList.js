import React from 'react';
import PropTypes from 'prop-types';

import ErrorsList from '__components/ErrorsList';
import Position from './Position'

const PositionsList = ({ positions, prices }) => {
  return positions.errors
    ? <ErrorsList errors={positions.errors} />
    : <div data-testid='positions-list'>
        {positions && positions.map((position) => (
          <Position key={position.id} position={position} prices={prices} />
        ))}
      </div>
}

export default PositionsList;

PositionsList.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ]),
  prices: PropTypes.object.isRequired
}
