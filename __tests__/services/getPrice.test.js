import getPrice from '__services/getPrice';
import pricesFixture from '__mocks/fixtures/prices/success.json';
import errorFixture from '__mocks/fixtures/prices/error.json';

describe('getPrice service', () => {
  let tokens;

  beforeEach(() => {
    tokens = ['ARB', 'USDC', 'WETH']
  });

  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => pricesFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns properly parsed response', async () => {
      const result = await getPrice(tokens);

      expect(result).toEqual({'ARB': 0.920302, 'USDC': 0.998581, 'WETH': 1699.14});
    });

    describe('when provided tokens array is empty', () => {
      beforeEach(() => {
        tokens = [];
      });

      it('returns empty hash', async () => {
        const result = await getPrice(tokens);

        expect(result).toEqual({});
      });
    })

    describe('when provided tokens array contains unknown tokens', () => {
      beforeEach(() => {
        tokens = ['ARB', 'USDC', 'WETH', 'UNKNOWNSCAMTOKEN']
      });

      it('returns properly parsed response with undefined price for unknown tokens', async () => {
        const result = await getPrice(tokens);

        expect(result).toEqual({'ARB': 0.920302, 'USDC': 0.998581, 'WETH': 1699.14, 'UNKNOWNSCAMTOKEN': undefined});
      });
    })

    describe('when provided tokens array contains doubles', () => {
      beforeEach(() => {
        tokens = ['ARB', 'USDC', 'WETH', 'ARB']
      });

      it('returns properly parsed response without doubles', async () => {
        const result = await getPrice(tokens);

        expect(result).toEqual({'ARB': 0.920302, 'USDC': 0.998581, 'WETH': 1699.14});
      });
    })
  })

  describe('when api returned error', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => errorFixture,
        status: 422,
        ok: false
      }));
    });

    it('returns hash without prices', async () => {
      const result = await getPrice(tokens);

      expect(result).toEqual({'ARB': undefined, 'USDC': undefined, 'WETH': undefined});
    });
  })
});
