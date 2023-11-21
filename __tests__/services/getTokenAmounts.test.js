import BigNumber from 'bignumber.js';
import getTokenAmounts from '__services/getTokenAmounts';

describe('getTokenAmounts', () => {
  describe('when current ticker is above the upper ticker', () => {
    const liquidity = 10860507277202;
    const sqrtPriceX96 = BigNumber('1906627091097897970122208862883908');
    const tickLow = 192180;
    const tickHigh = 193380;
    const decimal0 = 18;
    const decimal1 = 18;

    it('returns properly calculated amounts', () => {
      expect(
        getTokenAmounts(
          liquidity,
          sqrtPriceX96,
          tickLow,
          tickHigh,
          decimal0,
          decimal1,
        )
      ).toEqual({amount0: BigNumber(0), amount1: BigNumber(0.009999999999987420)})
    });
  })

  describe('when current ticker is below the lower ticker', () => {
    const liquidity = 10860507277202;
    const sqrtPriceX96 = BigNumber('1906627091097897970122208862883908');
    const tickLow = 192180;
    const tickHigh = 193380;
    const decimal0 = 18;
    const decimal1 = 18;

    it('returns properly calculated amounts', () => {
      expect(
        getTokenAmounts(
          liquidity,
          sqrtPriceX96,
          tickLow,
          tickHigh,
          decimal0,
          decimal1,
        )
      ).toEqual({amount0: BigNumber(0), amount1: BigNumber(0.009999999999987420)})
    });
  })

  describe('when current ticker is in range', () => {
    const liquidity = 10860507277202;
    const sqrtPriceX96 = BigNumber('1006627091097897900122208862883908');
    const tickLow = 192180;
    const tickHigh = 193380;
    const decimal0 = 18;
    const decimal1 = 18;

    it('returns properly calculated amounts', () => {
      expect(
        getTokenAmounts(
          liquidity,
          sqrtPriceX96,
          tickLow,
          tickHigh,
          decimal0,
          decimal1,
        )
      ).toEqual({amount0: BigNumber(0.000000000042470714), amount1: BigNumber(0)})
    });
  })
});
