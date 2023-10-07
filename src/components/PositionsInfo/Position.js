import React from 'react';
import PropTypes from 'prop-types';

const Position = ({position}) => {
  return <div>{position.id}</div>
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired
}
