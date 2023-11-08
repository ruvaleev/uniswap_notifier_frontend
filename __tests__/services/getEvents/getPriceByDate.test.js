import getPriceByDate from '__services/getEvents/getPriceByDate';

const expectedPrice = '26969.876144072576'

jest.mock('__services/getHistoricalPrice', () => {
  return jest.fn(() => Promise.resolve(expectedPrice));
});

import getHistoricalPrice from '__services/getHistoricalPrice';

describe('getPriceByDate', () => {
  const cacheKey = 'history_price_BTC_1695009234';
  const timestamp = 1695009234;
  const token = 'BTC';

  afterEach(() => {
    localStorage.removeItem(cacheKey);
  })

  describe('when value is in cache already', () => {
    beforeAll(() => {
      localStorage.setItem(cacheKey, expectedPrice);
    })

    it("doesn't call API and returns proper data retrieved from cache", async () => {
      expect(await getPriceByDate(token, timestamp)).toEqual(expectedPrice)

      expect(getHistoricalPrice).not.toHaveBeenCalled()
    });
  })

  describe('when value is not in cache yet', () => {
    it("calls API and saves retrieved data to cache", async () => {
      expect(await getPriceByDate(token, timestamp)).toEqual(expectedPrice)

      expect(getHistoricalPrice).toHaveBeenCalledTimes(1)
    });
  })
});
