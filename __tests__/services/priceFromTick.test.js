import priceFromTick from '__services/priceFromTick';

describe('priceFromTick service', () => {
  describe('with different decimals (18 and 8)', () => {
    const decimals0 = '18'
    const decimals1 = '8'

    describe("when tick = '258420'", () => {
      const tick = '258420'
  
      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: '16.690789764725376898', price1: '0.059913282360875363'}
        );
      });
    });
  
    describe("when tick = '259880'", () => {
      const tick = '259880'
  
      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: '19.314377305227210968', price1: '0.051774902405440824'}
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
          {price0: '1544.773960081565292057', price1: '0.000647343900040365'}
        );
      });
    });
  
    describe("when tick = '76050'", () => {
      const tick = '76050'
  
      it('returns correct result', () => {
        expect(priceFromTick(tick, decimals0, decimals1)).toEqual(
          {price0: '2007.448467185575736949', price1: '0.000498144792429960'}
        );
      });
    });
  })
});
