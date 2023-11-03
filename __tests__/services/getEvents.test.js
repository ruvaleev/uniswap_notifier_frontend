import getEvents from '__services/getEvents';

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  const { positionsManagerMock } = require('__mocks/positionsManagerMock')

  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation(() => positionsManagerMock()),
    }
  };
});

describe('getEvents', () => {
  const id = 1000;
  const decimals0 = 18;
  const decimals1 = 18;

  it('returns proper data retrieved from Contract', async () => {
    expect(await getEvents(id, decimals0, decimals1)).toEqual({
      collects: [
        {
          amount0: '0.113170575274402416',
          amount1: '205.450158813346474497',
          blockNumber: 136491756
        },
        {
          amount0: '0.17468539802218363',
          amount1: '19802.098020191023044861',
          blockNumber: 143631172
        }
      ],
      liquidityIncreases: [
        {
          amount0: '0.028400052060967359',
          amount1: '39044.924814345658556843',
          blockNumber: 132099846
        }
      ],
      liquidityDecreases: [
        {
          amount0: '0.023347648059209943',
          amount1: '19504.10771635450461526',
          blockNumber: 143631172
        }
      ]
    })
  });
});
