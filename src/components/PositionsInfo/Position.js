import React from 'react';
import PropTypes from 'prop-types';

import CommonInfo from './CommonInfo';
import FeesInfo from './FeesInfo';
import FinalResult from './FinalResult';
import ImpermanentLossInfo from './ImpermanentLossInfo';

const Position = ({position}) => {
  return (
    <div className="grid-container">
      <CommonInfo position={position} />
      <FeesInfo token0={position.token0} token1={position.token1}/>
      <ImpermanentLossInfo position={position}/>
      <FinalResult position={position} />
    </div>
  )
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired,
}
