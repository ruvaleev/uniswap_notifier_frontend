import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import buildPosition from '__services/buildPosition';
import { ERROR_MESSAGE_INVALID_STATUS, STATUSES } from '__services/buildPosition/constants';
import unfilledPosition from '__mocks/fixtures/positions/unfilledPosition';
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import poolFixture from '__mocks/fixtures/pools/response200success.json';

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  const { poolMock } = require('__mocks/poolMock')
  const {
    defaultCollectLogs, defaultDecreaseLiquidityLogs, positionsManagerMock
  } = require('__mocks/positionsManagerMock')
  const { rpcProviderMock } = require('__mocks/rpcProviderMock')
  const { POSITION_MANAGER_CONTRACT } = require('__constants');

  const collectLogs = { 100000: defaultCollectLogs[100001] }
  const decreaseLiquidityLogs = { 100000: defaultDecreaseLiquidityLogs[100001] }

  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation((address) => (
        address === POSITION_MANAGER_CONTRACT ? positionsManagerMock({ collectLogs, decreaseLiquidityLogs }) : poolMock({ address })
      )),
      JsonRpcProvider: jest.fn().mockImplementation(() => rpcProviderMock()),
    }
  };
});

jest.mock('__services/getHistoricalPrice', () => {
  const { getHistoricalPriceMock } = require('__mocks/services/getHistoricalPriceMock')

  return getHistoricalPriceMock();
});

function mockFetchPool() {
  return jest.fn(() => Promise.resolve(poolFixture.data.pools[0]));
}

jest.mock('__services/graph/fetchPool', () => mockFetchPool());

describe('buildPosition', () => {
  const position = unfilledPosition
  const prices = {'ARB': 0.920302, 'WETH': 1699.14}
  const token0WithFees = {
    decimals: '18',
    id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    symbol: 'WETH',
    amount: BigNumber('6.292472743425067'),
    initialAmount: BigNumber('0.028400052060967359'),
    fees: BigNumber('0.191920642674899304'),
    price: BigNumber('1723.2152798416475943434613275531910347284624'),
    minPrice: BigNumber('1544.7739600815653'),
    maxPrice: BigNumber('2007.4484671855757'),
    usdPrice: 1699.14,
    usdValue: BigNumber('10691.79213726326834238'),
    usdFees: BigNumber('326.10004079462840339856'),
  }
  const token1WithFees = {
    decimals: '18',
    id: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    symbol: 'ARB',
    amount: BigNumber('7847.529022166197'),
    initialAmount: BigNumber('39044.924814345658556843'),
    fees: BigNumber('344.630962460268691484'),
    price: BigNumber('0.0005803105460461641'),
    minPrice: BigNumber('0.00064734390004036526'),
    maxPrice: BigNumber('0.00049814479242996001'),
    usdPrice: 0.920302,
    usdValue: BigNumber('7222.096654157595431494'),
    usdFees: BigNumber('317.164564014110197310108168'),
  }
  const totalUsdValue = BigNumber('17913.888791420863773874');
  const holdUsdValue0 = BigNumber("24.12783222943603918563");
  const holdUsdValue1 = BigNumber("17966.561198245969130589863293");

  describe('when provided status is invalid', () => {
    const status = 'unknown'

    it('raises proper error', async () => {
      await expect(buildPosition(position, status, prices)).rejects.toThrow(ERROR_MESSAGE_INVALID_STATUS);
    })
  })

  describe('when status is gettingFeesInfo', () => {
    const status = STATUSES.gettingFeesInfo

    it("enriches position with detailes about prices, fees and totalUsdValue", async () => {
      const response = await buildPosition(position, status, prices)

      expect(response.status).toEqual(STATUSES.gettingEvents)
      expect(response.position.token0).toEqual(token0WithFees)
      expect(response.position.token1).toEqual(token1WithFees)
      expect(response.position.totalUsdValue).toEqual(totalUsdValue)
    });
  });

  describe('when status is gettingEvents', () => {
    const liquidityDecreases = [
      {
        liquidity: "1777054632055724840473",
        amount0: "0.011673824029604971",
        amount1: "9752.053858177253",
        blockNumber: 143631172,
        timestamp: 1698175159,
        usdPrice0: '1650',
        usdPrice1: '0.95',
      },
      {
        liquidity: "1777054632055724840474",
        amount0: "0.011673824029604972",
        amount1: "9752.053858177253",
        blockNumber: 143631172,
        timestamp: 1698175159,
        usdPrice0: '1650',
        usdPrice1: '0.95',
      }
    ]
    const position = {
      ...unfilledPosition,
      token0: token0WithFees,
      token1: token1WithFees,
      totalUsdValue: totalUsdValue,
      events: { ...fulfilledPosition.events, liquidityDecreases: liquidityDecreases }
    }
    const status = STATUSES.gettingEvents

    it("enriches position with historical data and events", async () => {
      const response = await buildPosition(position, status, prices)

      expect(response.status).toEqual(STATUSES.analyzeHistory)
      expect(response.position.events).toEqual(fulfilledPosition.events)
      expect(response.position.token0.holdUsdValue).toEqual(holdUsdValue0)
      expect(response.position.token1.holdUsdValue).toEqual(holdUsdValue1)
      expect(response.position.feesClaims).toEqual([
        {
          "amount0": BigNumber("0.113170575274402416"),
          "amount1": BigNumber("205.450158813346474497"),
          "timestamp": "1696176230",
          "usdAmount0": BigNumber("181.0729204390438656"),
          "usdAmount1": BigNumber("205.450158813346474497"),
        },
        {
          "amount0": BigNumber("0.151337749962973687"),
          "amount1": BigNumber("297.990303836517044861"),
          "timestamp": "1698175159",
          "usdAmount0": BigNumber("249.70728743890658355"),
          "usdAmount1": BigNumber("283.09078864469119261795"),
        }
      ])
    });
  });

  describe('when status is analyzeHistory', () => {
    const position = {
      ...unfilledPosition,
      events: fulfilledPosition.events,
      token0: { ...token0WithFees, holdUsdValue: holdUsdValue0 },
      token1: { ...token1WithFees, holdUsdValue: holdUsdValue1 },
      totalUsdValue: totalUsdValue
    }
    const status = STATUSES.analyzeHistory

    beforeEach(() => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('01.01.2024'));
    })

    it("enriches position with initial tick and age info", async () => {
      const response = await buildPosition(position, status, prices)

      expect(response.status).toEqual(STATUSES.completed)
      expect(response.position.initialTick).toEqual('76046')
      expect(response.position.initialTimestamp).toEqual(1695009234)
      expect(Math.floor(response.position.daysAge)).toEqual(104)
    });
  });

  describe('when error has been raised during processing', () => {
    const errorMessage = 'some error message'

    beforeEach(() => {
      ethers.Contract.mockImplementationOnce(() =>{
        throw new TypeError(errorMessage);
      })
    })

    const status = STATUSES.gettingFeesInfo

    it("returns position and failed status", async () => {
      const response = await buildPosition(position, status, prices)

      expect(response.status).toEqual(STATUSES.failed)
      expect(response.position.errorMessage).toEqual(errorMessage)
    });
  });
});
