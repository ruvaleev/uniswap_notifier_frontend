import BigNumber from "bignumber.js";

export const COINGECKO_CURRENCIES = {
  'ARB': 'arbitrum',
  'AXS': 'axie-infinity',
  'BLUR': 'blur',
  'DAI': 'dai',
  'ETH': 'ethereum',
  'GHO': 'gho',
  'GMX': 'gmx',
  'LINK': 'chainlink',
  'PSI': 'tridentdao',
  'SHIB': 'shiba-inu',
  'SPELL': 'spell-token',
  'USDC': 'usd-coin',
  'USDT': 'tether',
  'WBTC': 'wrapped-bitcoin',
  'WETH': 'weth',
  'wstETH': 'wrapped-steth',
}
export const HUNDRED = BigNumber(100)
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
export const PERCENT_PRECISION = 4;
export const POOLS_FIELDS = ['tick', 'id'].join(' ');
export const POSITION_MANAGER_CONTRACT = '0xc36442b4a4522e871399cd717abdd847ab11fe88';
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
  'owner',
  'tickLower',
  'tickUpper',
  'withdrawnToken0',
  'withdrawnToken1',
  'token0 { decimals id symbol }',
  'token1 { decimals id symbol }',
  'pool { id tick sqrtPrice }',
].join(' ');

export const PRICE_PRECISION = 18;
export const Q96 = BigNumber(Math.pow(2, 96));
export const Q128 = BigNumber(Math.pow(2, 128));
export const Q256 = BigNumber(Math.pow(2, 256));
export const YEAR_DAYS = BigNumber(365);
export const ZERO = BigNumber(0);
