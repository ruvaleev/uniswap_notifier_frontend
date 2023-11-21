import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { POSITION_MANAGER_CONTRACT } from '__constants';
import positionManagerAbi from './positionManagerAbi.json';
import getTimestamp from './getEvents/getTimestamp';
import getPriceByDate from './getEvents/getPriceByDate';

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const contract = new ethers.Contract(POSITION_MANAGER_CONTRACT, positionManagerAbi, provider);

const parseLogsFunctions = {
  parseLog: async function (log, t0, t1) {
    const timestamp = await getTimestamp(provider, log.blockNumber)
    const usdPrice0 = await getPriceByDate(t0.symbol, timestamp)
    const usdPrice1 = await getPriceByDate(t1.symbol, timestamp)

    return {
      amount0: BigNumber(log.args[2]).dividedBy(BigNumber(10).pow(t0.decimals)).toString(),
      amount1: BigNumber(log.args[3]).dividedBy(BigNumber(10).pow(t1.decimals)).toString(),
      blockNumber: log.blockNumber,
      timestamp,
      usdPrice0,
      usdPrice1
    }
  },
  parseLiquidityLog: async function (log, t0, t1) {
    const parsedLog = await parseLogsFunctions['parseLog'](log, t0, t1)

    return { ...parsedLog, liquidity: BigNumber(log.args[1]).toFixed() }
  }
}

const queryLogs = async (id, t0, t1, filterName, parseLogFnName = 'parseLog') => {
  const filter = contract.filters[filterName](id)
  const collectLogs = await contract.queryFilter(filter)
  const logsPromises = collectLogs.map(async (log) => (
    await parseLogsFunctions[parseLogFnName](log, t0, t1)
  ))

  return Promise.all(logsPromises)
}

const sortedByBlock = (logs) => logs.sort((a, b) => a.blockNumber - b.blockNumber)

const getEvents = async (id, t0, t1) => {
  const parsedCollectLogs = await queryLogs(id, t0, t1, 'Collect')
  const parsedIncreaseLiquidityLogs = await queryLogs(id, t0, t1, 'IncreaseLiquidity', 'parseLiquidityLog')
  const parsedDecreaseLiquidityLogs = await queryLogs(id, t0, t1, 'DecreaseLiquidity', 'parseLiquidityLog')

  return {
    collects: sortedByBlock(parsedCollectLogs),
    liquidityIncreases: sortedByBlock(parsedIncreaseLiquidityLogs),
    liquidityDecreases: sortedByBlock(parsedDecreaseLiquidityLogs),
  }
};

export default getEvents;
