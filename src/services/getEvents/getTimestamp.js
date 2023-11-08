import asyncCallWithCache from '__helpers/asyncCallWithCache';

const getBlockTimestamp = async (provider, blockNumber) => {
  const block = await provider.getBlock(blockNumber)

  return block.timestamp
}

const getTimestamp = async (provider, blockNumber) => {
  const cacheKey = `timestamp_${blockNumber}`
  const result = await asyncCallWithCache(cacheKey, getBlockTimestamp, provider, blockNumber)

  return +result
};

export default getTimestamp;
