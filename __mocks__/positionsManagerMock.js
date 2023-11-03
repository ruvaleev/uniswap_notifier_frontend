const defaultCollectLogs = [
  {
    args: [100000n, '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', 113170575274402416n, 205450158813346474497n],
    blockNumber: 136491756
  },
  {
    args: [100000n, '0xC36442b4a4522E871399CD717aBDD847Ab11FE88', 174685398022183630n, 19802098020191023044861n],
    blockNumber: 143631172
  }
]

const defaultIncreaseLiquidityLogs = [
  {
    args: [100000n, 7108218528222899361894n, 28400052060967359n, 39044924814345658556843n],
    blockNumber: 132099846
  }
]

const defaultDecreaseLiquidityLogs = [
  {
    args: [100000n, 3554109264111449680947n, 23347648059209943n, 19504107716354504615260n],
    blockNumber: 143631172
  }
]

export const positionsManagerMock = ({
  collectLogs = defaultCollectLogs,
  decreaseLiquidityLogs = defaultDecreaseLiquidityLogs,
  increaseLiquidityLogs = defaultIncreaseLiquidityLogs,
} = {}) => {
  return {
    filters: {
      Collect: () => 'collectFilter',
      DecreaseLiquidity: () => 'decreaseLiquidityFilter',
      IncreaseLiquidity: () => 'increaseLiquidityFilter'
    },
    queryFilter: jest.fn((filter) => {
      switch (filter) {
        case 'collectFilter':
          return Promise.resolve(collectLogs);
        case 'decreaseLiquidityFilter':
          return Promise.resolve(decreaseLiquidityLogs);
        case 'increaseLiquidityFilter':
          return Promise.resolve(increaseLiquidityLogs);
        default:
          return Promise.resolve([]);
      }
    })
  };
};
