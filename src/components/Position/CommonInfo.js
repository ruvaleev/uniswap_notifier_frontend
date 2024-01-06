import React from 'react';
import PropTypes from 'prop-types';

import Clocks from '__assets/icons/Clocks';

const AgeInfo = ({ daysAge }) => (
  daysAge && <>
    <div className='ml-auto mr-2'>
      <Clocks/>
    </div>
    <div className="grid-item font-avenir">{Math.floor(daysAge)} days</div>
  </>
)

const CommonInfo = ({ position }) => {
  return (
    <>
      <div className="flex grid-item items-center justify-between mb-5">
        <div className="grid-item font-number">{position.id}</div>
        <AgeInfo daysAge={position.daysAge} />
      </div>
    </>
  )
};

export default CommonInfo;

CommonInfo.propTypes = {
  position: PropTypes.object.isRequired,
}

AgeInfo.propTypes = {
  daysAge: PropTypes.number,
}
