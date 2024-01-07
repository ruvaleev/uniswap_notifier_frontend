import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CommonInfo from './CommonInfo';
import FeesInfo from './FeesInfo';
import FinalResult from './FinalResult';
import FinanceInfo from './FinanceInfo';
import ImpermanentLossInfo from './ImpermanentLossInfo';
import ILWidget from '__components/widgets/ILWidget';
import EarnedFeesWidget from '__components/widgets/EarnedFeesWidget';
import { ZERO } from '__constants';
import { STATUSES } from '__services/buildPosition/constants';
import buildPosition from '__services/buildPosition';
import ProportionsInfo from './ProportionsInfo';
import getMaxIL from '__services/getMaxIL';

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
    <div className="grid-item relative top-1/2">
      <div className={`absolute grid-item secondary status-message text-sm ${isVisible || 'disappearing'}`}>
        {message}
      </div>
    </div>
  )
}

const LeftPart = ({ position }) => {
  const calculateClaimedFees = (feesClaims) => (
    feesClaims
    ? feesClaims.reduce((acc, claim) => acc.plus(claim.usdAmount0).plus(claim.usdAmount1), ZERO)
    : ZERO
  )

  const { token0, token1, feesClaims } = position

  const maxIl = getMaxIL(position)
  const claimedFees = calculateClaimedFees(feesClaims)
  const unclaimedFees = token0.usdFees?.plus(token1.usdFees) || ZERO
  const earnedFees = claimedFees.plus(unclaimedFees)

  return (
    <>
      <ILWidget position={position} maxIl={maxIl}/>
      <div className='my-5'>
        <EarnedFeesWidget earnedFees={earnedFees} maxIl={maxIl}/>
      </div>
      <div className='self-end'>
        <FeesInfo token0={token0} token1={token1} feesClaims={feesClaims} maxIl={maxIl}/>
        <ImpermanentLossInfo position={position}/>
      </div>
    </>
  )
}

const RightPart = ({ position }) => (
  <>
    <ProportionsInfo t0={position.token0} t1={position.token1}/>
    <div className='self-end'>
      <FinanceInfo position={position} />
      <FinalResult position={position} />
    </div>
  </>
)

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

  const isCompleted = status === STATUSES.completed

  return (
    <div className="basis-full font-avenir grid-container mb-2 position px-8 py-5">
      <Status status={status} disappearing={isCompleted}/>
      <CommonInfo position={position} />
      {
        position.errorMessage
        ? <Error message={position.errorMessage} />
        : isCompleted &&
          <div className='flex'>
            <div className='basis-1/2 grid pr-8 relative right-bordered'>
              <LeftPart position={position}/>
            </div>
            <div className='basis-1/2 grid pl-8'>
              <RightPart position={position}/>
            </div>
          </div>
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

LeftPart.propTypes = {
  position: PropTypes.object.isRequired,
}

RightPart.propTypes = {
  position: PropTypes.object.isRequired,
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  disappearing: PropTypes.bool
}
