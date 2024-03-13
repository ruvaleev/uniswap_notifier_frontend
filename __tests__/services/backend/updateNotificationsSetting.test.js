import updateNotificationsSetting from '__services/backend/updateNotificationsSetting';

describe('updateNotificationsSetting service', () => {
  const params = { out_of_range: false }

  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 200,
        ok: true,
      }));
    });

    it('returns proper response', async () => {
      const result = await updateNotificationsSetting(params);

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

    it('raises proper error', async () => {
      await expect(updateNotificationsSetting(params)).rejects.toThrow('Unauthenticated');
    });
  })
});
