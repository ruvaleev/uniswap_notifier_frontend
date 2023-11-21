import daysAgo from '__helpers/daysAgo';
import fetchPool from '__services/graph/fetchPool';

const getInitialBlock = async (position) => {
  const openEvent = position.events.liquidityIncreases.sort((a, b) => a[1] - b[1])[0]
  const initialBlockNumber = openEvent.blockNumber
  const pool = await fetchPool(position.pool.id, initialBlockNumber)
  const initialTimestamp = openEvent.timestamp
  position.initialTick = pool.tick
  position.initialTimestamp = initialTimestamp
  position.daysAge = daysAgo(initialTimestamp * 1000)
}

export default getInitialBlock;
