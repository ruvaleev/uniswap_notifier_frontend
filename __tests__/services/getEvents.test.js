import { ethers } from 'ethers';

import getEvents from '__services/getEvents';

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  const { positionsManagerMock } = require('__mocks/positionsManagerMock')
  const { rpcProviderMock } = require('__mocks/rpcProviderMock')

  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation(() => positionsManagerMock()),
      JsonRpcProvider: jest.fn().mockImplementation(() => rpcProviderMock()),
    }
  };
});

jest.mock('__services/getHistoricalPrice', () => {
  const { getHistoricalPriceMock } = require('__mocks/services/getHistoricalPriceMock')

  return getHistoricalPriceMock();
});

const expectedResult = {
  collects: [
    {
      amount0: '0.113170575274402416',
      amount1: '205.450158813346474497',
      blockNumber: 136491756,
      timestamp: 1696176230,
      usdPrice0: '1600',
      usdPrice1: '1',
    },
    {
      amount0: '0.17468539802218363',
      amount1: '19802.098020191023044861',
      blockNumber: 143631172,
      timestamp: 1698175159,
      usdPrice0: '1650',
      usdPrice1: '0.95',
    }
  ],
  liquidityIncreases: [
    {
      liquidity: '386283065283473',
      amount0: '0',
      amount1: '11.950680406515371969',
      blockNumber: 143631172,
      timestamp: 1698175159,
      usdPrice0: '1650',
      usdPrice1: '0.95',
    }
  ],
  liquidityDecreases: [
    {
      liquidity: '1777054632055724840473',
      amount0: '0.011673824029604971',
      amount1: '9752.053858177253',
      blockNumber: 143631172,
      timestamp: 1698175159,
      usdPrice0: '1650',
      usdPrice1: '0.95',
    },
    {
      liquidity: '1777054632055724840474',
      amount0: '0.011673824029604972',
      amount1: '9752.053858177253',
      blockNumber: 143631172,
      timestamp: 1698175159,
      usdPrice0: '1650',
      usdPrice1: '0.95',
    }
  ]
}

describe('getEvents', () => {
  afterEach(() => {
    localStorage.removeItem('timestamp_136491756');
    localStorage.removeItem('timestamp_143631172');
  })

  const id = 100001;
  const token0 = { symbol: 'WETH', decimals: 18 }
  const token1 = { symbol: 'ARB', decimals: 18 }

  it('returns proper data retrieved from Contract and saves retrieved data to localStorage', async () => {
    expect(await getEvents(id, token0, token1)).toEqual(expectedResult)

    expect(ethers.JsonRpcProvider).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem('timestamp_136491756')).toEqual('1696176230')
    expect(localStorage.getItem('timestamp_143631172')).toEqual('1698175159')
  });

  describe('when timestamps of provided blocks are already in cache', () => {
    beforeAll(() => {
      localStorage.setItem('timestamp_136491756', 1696176230);
      localStorage.setItem('timestamp_143631172', 1698175159);
      ethers.JsonRpcProvider.mockClear();
    })

    it("returns proper data retrieved from Contract but doesn't query timestamps", async () => {
      expect(await getEvents(id, token0, token1)).toEqual(expectedResult)
      expect(ethers.JsonRpcProvider).not.toHaveBeenCalled()
    });
  })
});
