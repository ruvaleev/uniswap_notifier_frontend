import { rpcProviderMock } from '__mocks/rpcProviderMock';
import getTimestamp from '__services/getEvents/getTimestamp';

describe('getTimestamp', () => {
  const blockNumber = 132099846;
  const cacheKey = 'timestamp_132099846';
  const timestamp = 1695009234;
  const providerMock = rpcProviderMock()

  afterEach(() => {
    localStorage.removeItem(cacheKey);
    providerMock.getBlock.mockClear();
  })

  describe('when value is in cache already', () => {
    beforeAll(() => {
      localStorage.setItem(cacheKey, timestamp);
    })

    it("doesn't call provider functions and returns proper data retrieved from cache", async () => {
      expect(await getTimestamp(providerMock, blockNumber)).toEqual(timestamp)

      expect(providerMock.getBlock).not.toHaveBeenCalled()
    });
  })

  describe('when value is not in cache yet', () => {
    it('calls provider function and saves retrieved data to cache', async () => {
      expect(await getTimestamp(providerMock, blockNumber)).toEqual(timestamp)

      expect(providerMock.getBlock).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem(cacheKey)).toEqual(String(timestamp));
    });
  })
});
