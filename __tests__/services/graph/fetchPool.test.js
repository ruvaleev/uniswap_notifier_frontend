import fetchPool from '__services/graph/fetchPool';
import poolFixture from '__mocks/fixtures/pools/response200success.json';
import errorsPositionsFixture from '__mocks/fixtures/pools/response200error.json';
import errorFixture from '__mocks/fixtures/pools/response400error.json';

describe('fetchPool service', () => {
  const poolAddress = '0xc6f780497a95e246eb9449f5e4770916dcd6396a';
  const blockNumber = 132099846;

  describe('when successful', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => poolFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns properly parsed response', async () => {
      const result = await fetchPool(poolAddress, blockNumber);

      expect(result).toEqual(poolFixture.data.pools[0]);
    });
  })

  describe('when 200 response with error inside', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => errorsPositionsFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns properly parsed error', async () => {
      const result = await fetchPool(poolAddress, blockNumber);

      expect(result).toEqual({errors: [errorsPositionsFixture.errors[0].message]});
    });
  })

  describe('when 400 response with error inside', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => errorFixture,
        status: 400,
        ok: false
      }));
    });

    it('returns properly parsed error', async () => {
      const result = await fetchPool(poolAddress, blockNumber);

      expect(result).toEqual({errors: [errorFixture.error]});
    });
  })
});
