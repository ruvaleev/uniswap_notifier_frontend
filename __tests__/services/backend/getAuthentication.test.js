import getAuthentication from '__services/backend/getAuthentication';
import { ethereumMock } from '__mocks/ethereumMock';

describe('getAuthentication service', () => {
  beforeAll(() => {
    ethereumMock()
  })

  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        ok: true
      }));
    });

    it('returns true', async () => {
      const result = await getAuthentication();

      expect(result).toEqual(true);
    });
  })

  describe('when api returned error', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 401,
        ok: false
      }));
    });

    it('returns false', async () => {
      const result = await getAuthentication();

      expect(result).toEqual(false);
    });
  })
});
