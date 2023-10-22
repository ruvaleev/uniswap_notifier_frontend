import BigNumber from 'bignumber.js';
import moneyFormat from '__helpers/moneyFormat';

describe('moneyFormat', () => {
  describe('when input is a BigNumber', () => {
    const input = BigNumber('140.125');

    it('returns proper string representation of provided value with proper precision', () => {
      expect(moneyFormat(input)).toEqual('$140.13')
    })
  })

  describe('when input is a Number', () => {
    const input = Number('140.125');

    it('returns proper string representation of provided value with proper precision', () => {
      expect(moneyFormat(input)).toEqual('$140.13')
    })
  })

  describe('when input is a String', () => {
    const input = '140.124';

    it('returns proper string representation of provided value with proper precision', () => {
      expect(moneyFormat(input)).toEqual('$140.12')
    })
  })

  describe('when input is undefined', () => {
    const input = undefined;

    it('returns proper string representation of provided value with proper precision', () => {
      expect(moneyFormat(input)).toEqual(' ... ')
    })
  })
});
