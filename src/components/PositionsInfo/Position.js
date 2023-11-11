import React from 'react';
import PropTypes from 'prop-types';

import CommonInfo from './CommonInfo';
import FeesInfo from './FeesInfo';
import FinalResult from './FinalResult';
import ImpermanentLossInfo from './ImpermanentLossInfo';
import ProjectedILInfo from '__components/ProjectedILInfo';

const Position = ({position}) => {
  const { collects, liquidityDecreases } = position.events || {}
  const { token0, token1 } = position

  return (
    <div className="grid-container">
      <CommonInfo position={position} />
      <FinalResult position={position} />
      <FeesInfo token0={token0} token1={token1} collects={collects} liquidityDecreases={liquidityDecreases}/>
      {position.initialTick && <ProjectedILInfo position={position}/>}
      <ImpermanentLossInfo position={position}/>
    </div>
  )
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired,
}
