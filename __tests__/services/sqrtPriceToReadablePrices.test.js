import sqrtPriceToReadablePrices from '__services/sqrtPriceToReadablePrices';

describe('sqrtPriceToReadablePrices', () => {
  describe('when same decimals', () => {
    const sqrtPrice = '3420681548118335492319455309976';
    const decimals0 = '18';
    const decimals1 = '18';

    it('returns properly calculated prices', () => {
      expect(
        sqrtPriceToReadablePrices(sqrtPrice, decimals0, decimals1)
      ).toEqual({price0: '0.000536455716525690', price1: '1864.086762792676942462'})
    });
  })

  describe('when different decimals', () => {
    const sqrtPrice = '3203290579741954898715345';
    const decimals0 = '18';
    const decimals1 = '6';

    it('returns properly calculated prices', () => {
      expect(
        sqrtPriceToReadablePrices(sqrtPrice, decimals0, decimals1)
      ).toEqual({price0: '0.000611739458566176', price1: '1634.682847406717736146'})
    });
  })
});
