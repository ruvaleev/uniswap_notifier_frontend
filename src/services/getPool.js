import { ethers } from "ethers";

import poolAbi from './poolAbi.json'

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

async function getPool(poolAddress, tickLower, tickUpper) {
  const poolContract = new ethers.Contract(poolAddress, poolAbi, provider);
  const [feeGrowthGlobal0X128, feeGrowthGlobal1X128, lowTick, highTick] = await Promise.all(
    [
      poolContract.feeGrowthGlobal0X128(),
      poolContract.feeGrowthGlobal1X128(),
      poolContract.ticks(tickLower),
      poolContract.ticks(tickUpper),
    ]
  );

  return {
    feeGrowthGlobal0X128: feeGrowthGlobal0X128,
    feeGrowthGlobal1X128: feeGrowthGlobal1X128,
    lowTickFeeGrowthOutside0X128: lowTick.feeGrowthOutside0X128,
    lowTickFeeGrowthOutside1X128: lowTick.feeGrowthOutside1X128,
    highTickFeeGrowthOutside0X128: highTick.feeGrowthOutside0X128,
    highTickFeeGrowthOutside1X128: highTick.feeGrowthOutside1X128,
  };
}

export default getPool;
