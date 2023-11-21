export const ethereumMock = ({ addresses = [] } = {}) => {
  const ethereumRequestMock = jest.fn().mockImplementation(() => {
    return Promise.resolve(addresses);
  });

  global.window.ethereum = {
    on: jest.fn(),
    removeListener: jest.fn(),
    request: ethereumRequestMock,
    chainId: '0xa4b1',
  };
};
