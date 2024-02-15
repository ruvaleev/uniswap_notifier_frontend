import getNotificationsSetting from '__services/backend/getNotificationsSetting';
import notificationsSettingFixture from '__mocks/fixtures/notificationsSetting/success.json';

describe('getNotificationsSetting service', () => {
  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => notificationsSettingFixture,
        status: 200,
        ok: true,
      }));
    });

    it('returns proper response', async () => {
      const result = await getNotificationsSetting();

      expect(result).toEqual(notificationsSettingFixture);
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
      await expect(getNotificationsSetting()).rejects.toThrow('Unauthenticated');
    });
  })
});
