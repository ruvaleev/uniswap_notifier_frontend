import priceFromTick from '__services/priceFromTick';
import BigNumber from 'bignumber.js';

describe('priceFromTick service', () => {
  describe('with different decimals (18 and 8)', () => {
    const decimals0 = '18'
    const decimals1 = '8'

    describe("when tick = '258420'", () => {
      const tick = '258420'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('16.690789764725378'), price1: BigNumber('0.05991328236087536062')}
        );
      });
    });

    describe("when tick = '259880'", () => {
      const tick = '259880'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('19.31437730522721'), price1: BigNumber('0.05177490240544082736')}
        );
      });
    });

    describe("when tick = '259892'", () => {
      const tick = '259892'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('19.337567309732623'), price1: BigNumber('0.05171281288813917601')}
        );
      });
    });
  })

  describe('with different decimals (8 and 18)', () => {
    const decimals0 = '8'
    const decimals1 = '18'

    describe("when tick = '259892'", () => {
      const tick = '259892'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('19.337567309732623'), price1: BigNumber('0.05171281288813917601')}
        );
      });
    });
  })

  describe('with same decimals (18 and 18)', () => {
    const decimals0 = '18'
    const decimals1 = '18'

    describe("when tick = '73430'", () => {
      const tick = '73430'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('1544.7739600815653'), price1: BigNumber('0.00064734390004036526')}
        );
      });
    });

    describe("when tick = '76050'", () => {
      const tick = '76050'

      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: BigNumber('2007.4484671855757'), price1: BigNumber('0.00049814479242996001')}
        );
      });
    });
  })
});
