import BigNumber from 'bignumber.js';
import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';

describe('sqrtPriceToReadablePrices', () => {
  describe('when same decimals', () => {
    const sqrtPrice = '3420681548118335492319455309976';
    const decimals0 = '18';
    const decimals1 = '18';

    it('returns properly calculated prices', () => {
      expect(
        sqrtPriceToReadablePrices(sqrtPrice, decimals0, decimals1)
      ).toEqual({
        price0: BigNumber('1864.0867627926769424621789134918931076452025'),
        price1: BigNumber('0.0005364557165256903')
      })
    });
  })

  describe('when different decimals', () => {
    const sqrtPrice = '3203290579741954898715345';
    const decimals0 = '18';
    const decimals1 = '6';

    it('returns properly calculated prices', () => {
      expect(
        sqrtPriceToReadablePrices(sqrtPrice, decimals0, decimals1)
      ).toEqual({
        price0: BigNumber('1634.6828474067177361455112993225'),
        price1: BigNumber('0.00061173945856617575')
      })
    });
  })

  describe("with decimals0 = '8' and decimals1 = '18' and liquidity = '33937225031909479086361535233395569'", () => {
    const sqrtPrice = '33937225031909479086361535233395569';
    const decimals0 = '8';
    const decimals1 = '18';

    it('returns properly calculated prices', () => {
      expect(
        sqrtPriceToReadablePrices(sqrtPrice, decimals0, decimals1)
      ).toEqual({
        price0: BigNumber('18.34820099176733161624334854267284381293146841943601'),
        price1: BigNumber('0.05450125603314955877')
      })
    });
  });
});
