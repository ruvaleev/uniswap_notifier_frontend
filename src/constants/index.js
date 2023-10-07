export const NETWORK_PARAMS = {
  arbitrum: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io'],
  }
};

export const POSITIONS_FIELDS = [
  'amountCollectedUSD',
  'amountDepositedUSD',
  'amountWithdrawnUSD',
  'collectedFeesToken0',
  'collectedFeesToken1',
  'collectedToken0',
  'collectedToken1',
  'depositedToken0',
  'depositedToken1',
  'feeGrowthInside0LastX128',
  'feeGrowthInside1LastX128',
  'id',
  'liquidity',
  'tickLower',
  'tickUpper',
  'withdrawnToken0',
  'withdrawnToken1',
  'owner',
  'pool { tick }',
].join(' ');

export const PRICE_PRECISION = 18;
