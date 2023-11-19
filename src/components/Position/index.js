import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CommonInfo from './CommonInfo';
import FeesInfo from './FeesInfo';
import FinalResult from './FinalResult';
import FinanceInfo from './FinanceInfo';
import ImpermanentLossInfo from './ImpermanentLossInfo';
import { STATUSES } from '__services/buildPosition/constants';
import buildPosition from '__services/buildPosition';
import ProportionsInfo from './ProportionsInfo';

const statusMessage = {
  [STATUSES.gettingFeesInfo]: 'Getting Info About Fees...',
  [STATUSES.gettingEvents]: 'Getting Historical Events...',
  [STATUSES.analyzeHistory]: 'Analyze Position History...',
  [STATUSES.completed]: 'Completed',
  [STATUSES.failed]: 'Failed',
}

const Error = ({ message }) => {
  return (
    <div className="grid-container" data-testid='dashboard'>
      <div className="grid-item leading-4 my-2">
        <div className="grid-item secondary text-center">{message}</div>
      </div>
    </div>
  )
}

const Status = ({ status, disappearing = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (disappearing) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [disappearing]);

  const message = statusMessage[status]
  return message && (
    <div className="grid-item leading-4 my-2 relative">
      <div className={`absolute grid-item right-50 secondary text-sm ${isVisible || 'disappearing'}`}>{message}</div>
    </div>
  )
}

const Position = ({position, prices, completionCallback = () => {}, initialStatus = STATUSES.gettingFeesInfo }) => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (status === STATUSES.completed) { return completionCallback(position) }
    if (status === STATUSES.failed) { return }

    const processPosition = async () => {
      await buildPosition(position, status, prices)
        .then(({ status }) => (
          setStatus(status)
        ))
    };
    processPosition();
  }, [status])

  const { token0, token1, feesClaims } = position
  const isCompleted = status === STATUSES.completed

  return (
    <div className="grid-container position">
      <Status status={status} disappearing={isCompleted}/>
      <CommonInfo position={position} />
      {
        position.errorMessage
        ? <Error message={position.errorMessage} />
        : isCompleted &&
          <>
            <ProportionsInfo t0={token0} t1={token1}/>
            <FinanceInfo position={position} />
            <FinalResult position={position} />
            <FeesInfo token0={token0} token1={token1} feesClaims={feesClaims} />
            <ImpermanentLossInfo position={position}/>
          </>
      }
    </div>
  )
}

export default Position;

Position.propTypes = {
  position: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  initialStatus: PropTypes.string,
  completionCallback: PropTypes.func
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  disappearing: PropTypes.bool
}
