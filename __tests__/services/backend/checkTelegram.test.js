import checkTelegram from '__services/backend/checkTelegram';
import conectedFixture from '__mocks/fixtures/backend/checkTelegram/connected.json';
import disconectedFixture from '__mocks/fixtures/backend/checkTelegram/disconnected.json';
import UnauthenticatedError from '__src/errors/UnauthenticatedError';

describe('checkTelegram service', () => {
  const mockFetch = (fixture) => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => fixture,
      status: 200,
      ok: true
    }));
  }

  describe('when api returns successful response', () => {
    describe('when telegram connected', () => {
      beforeEach(() => {
        mockFetch(conectedFixture)
      });
  
      it('returns received response', async () => {
        const result = await checkTelegram();
  
        expect(result).toEqual(conectedFixture);
      });
    })

    describe('when telegram disconnected', () => {
      beforeEach(() => {
        mockFetch(disconectedFixture)
      });
  
      it('returns received response', async () => {
        const result = await checkTelegram();
  
        expect(result).toEqual(disconectedFixture);
      });
    })
  })

  describe('when api returned error', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 401,
        ok: false
      }));
    });

    it('raises UnauthenticatedError', async () => {
      await expect(checkTelegram()).rejects.toThrow(UnauthenticatedError);
    });
  })
});
