import { HUNDRED, PERCENT_PRECISION } from '__constants';
import getILData from './getILData';

function getMaxIL(position) {
  if (!position.initialTick) { return 0 }

  const initialTick = +position.initialTick
  const tickLower = +position.tickLower
  const tickUpper =  +position.tickUpper
  const maxIlTick = (initialTick - tickLower) > (tickUpper - initialTick) ? tickLower : tickUpper
  const ilData =
    getILData(
      maxIlTick,
      initialTick,
      tickLower,
      tickUpper,
      position.liquidity,
      position.token0.decimals,
      position.token1.decimals
    )
  const percent = ilData.impermanentLoss.toFixed(PERCENT_PRECISION)
  const usd = position.totalUsdValue.multipliedBy(percent).dividedBy(HUNDRED).toFixed(2)

  return +usd
}

export default getMaxIL;
