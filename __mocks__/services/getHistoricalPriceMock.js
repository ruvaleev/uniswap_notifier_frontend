const defaultPrices = {
  1695009234: {'WETH': '1700', 'ARB': '0.90', 'USDC': '1'},
  1696176230: {'WETH': '1600', 'ARB': '1', 'USDC': '1'},
  1698175159: {'WETH': '1650', 'ARB': '0.95', 'USDC': '1'}
}

export const getHistoricalPriceMock = ({prices = defaultPrices} = {}) => (
  jest.fn((token, timestamp) => Promise.resolve(prices[timestamp][token]))
);
