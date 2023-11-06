export const rpcProviderMock = () => {
  return {
    getBlock: jest.fn((blockNumber) => {
      switch (blockNumber) {
        case 132099846:
          return Promise.resolve({timestamp: 1695009234});
        case 143631172:
          return Promise.resolve({timestamp: 1698175159});
        default:
          return Promise.resolve([]);
      }
    })
  };
};
