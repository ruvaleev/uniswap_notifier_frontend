import fetchPositions from '../../../src/services/graph/fetchPositions';
import positionsFixture from '../../../__mocks__/fixtures/positions/response200success.json';
import errorsPositionsFixture from '../../../__mocks__/fixtures/positions/response200error.json';
import errorFixture from '../../../__mocks__/fixtures/positions/response400error.json';

describe('fetchPositions service', () => {
  describe('when successful', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => positionsFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns properly parsed response', async () => {
      const result = await fetchPositions("0x1542dadda32ba086434d589a8f005176d6e650b4");

      expect(result).toEqual(positionsFixture.data.positions);
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
      const result = await fetchPositions("0x1542dadda32ba086434d589a8f005176d6e650b4");

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
      const result = await fetchPositions("0x1542dadda32ba086434d589a8f005176d6e650b4");

      expect(result).toEqual({errors: [errorFixture.error]});
    });
  })
});
