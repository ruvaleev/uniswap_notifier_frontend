export const rpcProviderMock = () => {
  const blocksTimestamps = {
    132099846: {timestamp: 1695009234},
    136491756: {timestamp: 1696176230},
    143631172: {timestamp: 1698175159}
  }
  return {
    getBlock: jest.fn((blockNumber) => Promise.resolve(blocksTimestamps[blockNumber]))
  };
};
