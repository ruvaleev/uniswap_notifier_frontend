const defaultPrices = {
  1695009234: {'WETH': '1700', 'ARB': '0.90'},
  1696176230: {'WETH': '1600', 'ARB': '1'},
  1698175159: {'WETH': '1650', 'ARB': '0.95'}
}

export const getHistoricalPriceMock = ({prices = defaultPrices} = {}) => (
  jest.fn((token, timestamp) => Promise.resolve(prices[timestamp][token]))
);
