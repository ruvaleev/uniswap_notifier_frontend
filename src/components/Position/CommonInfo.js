import React from 'react';
import PropTypes from 'prop-types';

const CommonInfo = ({ position }) => {
  return (
    <>
      <div className="flex grid-item justify-between">
        <div className="grid-item secondary">{position.id}</div>
        {
          position.daysAge &&
            <div className="grid-item secondary">{Math.floor(position.daysAge)} days</div>
        }
      </div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}
