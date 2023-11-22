import checkAuth from '__services/backend/checkAuth';

describe('checkAuth service', () => {
  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        ok: true
      }));
    });

    it('returns true', async () => {
      const result = await checkAuth();

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
      const result = await checkAuth();

      expect(result).toEqual(false);
    });
  })
});
