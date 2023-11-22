import getTelegramLink from '__services/backend/getTelegramLink';
import telegramLinkFixture from '__mocks/fixtures/backend/getTelegramLink/success.json';
import UnauthenticatedError from '__src/errors/UnauthenticatedError';

describe('getTelegramLink service', () => {
  describe('when api returns successful response', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => telegramLinkFixture,
        status: 200,
        ok: true
      }));
    });

    it('returns link', async () => {
      const result = await getTelegramLink();

      expect(result).toEqual(telegramLinkFixture.link);
    });
  })

  describe('when api returned error', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 401,
        ok: false
      }));
    });

    it('raises UnauthenticatedError', async () => {
      await expect(getTelegramLink()).rejects.toThrow(UnauthenticatedError);
    });
  })
});
