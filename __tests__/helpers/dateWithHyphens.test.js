import dateWithHyphens from '__helpers/dateWithHyphens';

describe('dateWithHyphens', () => {
  describe('when input is a number', () => {
    const input = 1699323491593;

    it('returns properly formatted date', () => {
      expect(dateWithHyphens(input)).toEqual('06-11-2023')
    })
  })

  describe('when input is a string', () => {
    const input = '1699323491593';

    it('returns properly formatted date', () => {
      expect(dateWithHyphens(input)).toEqual('06-11-2023')
    })
  })
});
