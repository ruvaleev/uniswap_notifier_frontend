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
        price0: BigNumber('1864.0867627926768292234659853896845472844356'),
        price1: BigNumber('0.00053645571652569033')
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
});
