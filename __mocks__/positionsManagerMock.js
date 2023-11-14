export const defaultCollectLogs = {
  100001: [
    {
      args: [100001n, '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', 113170575274402416n, 205450158813346474497n],
      blockNumber: 136491756
    },
    {
      args: [100001n, '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', 174685398022183630n, 19802098020191023044861n],
      blockNumber: 143631172
    }
  ]
}

export const defaultIncreaseLiquidityLogs = {
  100000: [
    {
      args: [100000n, 7108218528222899361894n, 28400052060967359n, 39044924814345658556843n],
      blockNumber: 132099846
    }
  ],
  100001: [
    {
      args: [100001n, 386283065283473n , 0n, 11950680406515371969n],
      blockNumber: 143631172
    }
  ]
}

export const defaultDecreaseLiquidityLogs = {
  100001: [
    {
      args: [100000n, 1777054632055724840473n, 11673824029604971n, 9752053858177253000000n],
      blockNumber: 143631172
    },
    {
      args: [100000n, 1777054632055724840474n, 11673824029604972n, 9752053858177253000000n],
      blockNumber: 143631172
    }
  ]
}

export const positionsManagerMock = ({
  collectLogs = defaultCollectLogs,
  decreaseLiquidityLogs = defaultDecreaseLiquidityLogs,
  increaseLiquidityLogs = defaultIncreaseLiquidityLogs,
} = {}) => {
  return {
    filters: {
      Collect: (id) => ({ name: 'collectFilter', id }),
      DecreaseLiquidity: (id) => ({ name: 'decreaseLiquidityFilter', id }),
      IncreaseLiquidity: (id) => ({ name: 'increaseLiquidityFilter', id })
    },
    queryFilter: jest.fn((filter) => {
      switch (filter.name) {
        case 'collectFilter':
          return Promise.resolve(collectLogs[filter.id] || []);
        case 'decreaseLiquidityFilter':
          return Promise.resolve(decreaseLiquidityLogs[filter.id] || []);
        case 'increaseLiquidityFilter':
          return Promise.resolve(increaseLiquidityLogs[filter.id] || []);
        default:
          return Promise.resolve([]);
      }
    })
  };
};
