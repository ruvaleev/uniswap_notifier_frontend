import { ZERO } from '__constants';

function getPositionIL(position) {
  if (!position.initialTick) { return { percent: ZERO, usd: ZERO } }

  const t0 = position.token0
  const t1 = position.token1
  if (!(t0.holdUsdValue && t0.holdUsdValue)) { return { percent: ZERO, usd: ZERO } }

  const totalHoldAmountUsd = t0.holdUsdValue.plus(t1.holdUsdValue)
  const impermanentLossUsd = t0.holdUsdValue.plus(t1.holdUsdValue).minus(position.totalUsdValue)
  const impermanentLossPercent = impermanentLossUsd.multipliedBy(100).dividedBy(totalHoldAmountUsd)

  return { percent: impermanentLossPercent, usd: impermanentLossUsd }
}

export default getPositionIL;
