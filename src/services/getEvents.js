import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { POSITION_MANAGER_CONTRACT } from '__constants';
import positionManagerAbi from './positionManagerAbi.json'

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const contract = new ethers.Contract(POSITION_MANAGER_CONTRACT, positionManagerAbi, provider);

const parseCollectLog = (log, decimals0, decimals1) => ({
  amount0: BigNumber(log.args[2]).dividedBy(BigNumber(10).pow(decimals0)).toString(),
  amount1: BigNumber(log.args[3]).dividedBy(BigNumber(10).pow(decimals1)).toString(),
  blockNumber: log.blockNumber,
});

const parseLiquidityLog = (log, decimals0, decimals1) => ({
  liquidity: BigNumber(log.args[1]).toFixed(),
  amount0: BigNumber(log.args[2]).dividedBy(BigNumber(10).pow(decimals0)).toString(),
  amount1: BigNumber(log.args[3]).dividedBy(BigNumber(10).pow(decimals1)).toString(),
  blockNumber: log.blockNumber,
});

const queryCollectLogs = async (id, decimals0, decimals1) => {
  const collectFilter = contract.filters.Collect(id)
  const collectLogs = await contract.queryFilter(collectFilter)

  return collectLogs.map((log) => parseCollectLog(log, decimals0, decimals1))
}

const queryIncreaseLiquidityLogs = async (id, decimals0, decimals1) => {
  const increaseLiquidityFilter = contract.filters.IncreaseLiquidity(id)
  const increaseLiquidityLogs = await contract.queryFilter(increaseLiquidityFilter)

  return increaseLiquidityLogs.map((log) => parseLiquidityLog(log, decimals0, decimals1))
}

const queryDecreaseLiquidityLogs = async (id, decimals0, decimals1) => {
  const decreaseLiquidityFilter = contract.filters.DecreaseLiquidity(id)
  const decreaseLiquidityLogs = await contract.queryFilter(decreaseLiquidityFilter)

  return decreaseLiquidityLogs.map((log) => parseLiquidityLog(log, decimals0, decimals1))
}

const getEvents = async (id, decimals0, decimals1) => {
  const parsedCollectLogs = await queryCollectLogs(id, decimals0, decimals1)
  const parsedIncreaseLiquidityLogs = await queryIncreaseLiquidityLogs(id, decimals0, decimals1)
  const parsedDecreaseLiquidityLogs = await queryDecreaseLiquidityLogs(id, decimals0, decimals1)

  return {
    collects: parsedCollectLogs,
    liquidityIncreases: parsedIncreaseLiquidityLogs,
    liquidityDecreases: parsedDecreaseLiquidityLogs,
  }
};

export default getEvents;
