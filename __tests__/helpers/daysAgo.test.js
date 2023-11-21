import daysAgo from '__helpers/daysAgo';

describe('daysAgo', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('01.01.2024'));
  })
  describe('when input is a number', () => {
    const input = 1699323491593;

    it('returns number of days passed since provided timestamp', () => {
      expect(daysAgo(input)).toEqual(54.904032488425926)
    })
  })

  describe('when input is a string', () => {
    const input = '1699323491593';

    it('returns number of days passed since provided timestamp', () => {
      expect(daysAgo(input)).toEqual(54.904032488425926)
    })
  })
});
