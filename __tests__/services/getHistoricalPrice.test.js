import getHistoricalPrice from '__services/getHistoricalPrice';
import successFixture from '__mocks/fixtures/historicalPrices/success.json';
import errorFixture from '__mocks/fixtures/historicalPrices/error.json';

describe('getHistoricalPrice service', () => {
  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => successFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns properly parsed response with usd price', async () => {
      const result = await getHistoricalPrice('BTC', '01-10-2023');

      expect(result).toEqual(26969.876144072576);
    });
  })

  describe('when api returned error', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => errorFixture,
        status: 404,
        ok: false
      }));
    });

    it('returns hash without prices', async () => {
      await expect(getHistoricalPrice('BTC', '01-10-2023')).rejects.toThrow('coin not found');
    });
  })
});
