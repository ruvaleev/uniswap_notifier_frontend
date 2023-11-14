import React from 'react';
import PropTypes from 'prop-types';

const CommonInfo = ({ position }) => {
  return (
    <>
      <div className="grid-item">
        <div className="grid-item secondary">{position.id}</div>
      </div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}
