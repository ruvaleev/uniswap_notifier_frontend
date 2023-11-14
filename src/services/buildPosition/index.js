import { ERROR_MESSAGE_INVALID_STATUS, STATUSES } from './constants';
import getFeesInfo from './getFeesInfo';
import getAndProcessEvents from './getAndProcessEvents';
import getInitialBlock from './getInitialBlock';

const processingFunctions = {
  gettingFeesInfo: getFeesInfo,
  gettingEvents: getAndProcessEvents,
  analyzeHistory: getInitialBlock,
}

const nextStatus = (status) => (
  {
    [STATUSES.gettingFeesInfo]: STATUSES.gettingEvents,
    [STATUSES.gettingEvents]: STATUSES.analyzeHistory,
    [STATUSES.analyzeHistory]: STATUSES.completed
  }[status]
)

async function buildPosition(position, status, prices) {
  const processingFn = processingFunctions[status]
  if (!processingFn) { throw new Error(ERROR_MESSAGE_INVALID_STATUS) }

  await processingFn(position, prices)
    .then(() => {
      status = nextStatus(status)
    })
    .catch(error => {
      status = STATUSES.failed
      position.errorMessage = error.message
    });

  return {
    position: position,
    status: status
  }
}

export default buildPosition;
