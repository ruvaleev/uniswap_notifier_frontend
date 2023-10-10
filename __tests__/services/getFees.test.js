import BigNumber from 'bignumber.js';
import getFees from '__services/getFees';

describe('getFees', () => {
  describe('when same decimals', () => {
    const liquidity = BigNumber('7108218528222899361894')
    const feeGrowthGlobal0X128 = BigNumber('208835107267699315514338644992581187')
    const feeGrowthGlobal1X128 = BigNumber('313653298461314658420682448261369158520')
    const tickUpper = 76050
    const tickLower = 73430
    const feeGrowthOutside0X128Upper = BigNumber('6870750798044025148227866664355024') // of the upper tick of position
    const feeGrowthOutside1X128Upper = BigNumber('14013529065654888970332476500856001847') // of the upper tick of position
    const feeGrowthOutside0X128Lower = BigNumber('129362448994648287540025458230935296') // of the lower tick of position
    const feeGrowthOutside1X128Lower = BigNumber('175943338775698876993679593052051410691') // of the lower tick of position
    const feeGrowthInside0LastX128 = BigNumber('69152337145849472040338377168383236')
    const feeGrowthInside1LastX128 = BigNumber('117001692319817971649209116374655145049')
    const tick = 75677
    const decimals0 = 18
    const decimals1 = 18

    it('returns properly calculated fees', () => {
      expect(
        getFees(
          feeGrowthGlobal0X128,
          feeGrowthGlobal1X128,
          feeGrowthOutside0X128Lower,
          feeGrowthOutside0X128Upper,
          feeGrowthInside0LastX128,
          feeGrowthOutside1X128Lower,
          feeGrowthOutside1X128Upper,
          feeGrowthInside1LastX128,
          liquidity,
          decimals0,
          decimals1,
          tickLower,
          tickUpper,
          tick
        )
      ).toEqual({fees0: '0.072058684527202058', fees1: '139.847572053993474128'})
    });
  })

  describe('when different decimals', () => {
    const liquidity = BigNumber('477550033551699')
    const feeGrowthGlobal0X128 = BigNumber('38801535727909269532917328293691613330053')
    const feeGrowthGlobal1X128 = BigNumber('66815283213268741772954215092612')
    const tickUpper = -200310
    const tickLower = -203190
    const feeGrowthOutside0X128Upper = BigNumber('302262195143298415259619494746838407729') // of the upper tick of position
    const feeGrowthOutside1X128Upper = BigNumber('612076910341715108280663452272') // of the upper tick of position
    const feeGrowthOutside0X128Lower = BigNumber('1389446086837536329373633889581184202797') // of the lower tick of position
    const feeGrowthOutside1X128Lower = BigNumber('2477092305229384387505363697019') // of the lower tick of position
    const feeGrowthInside0LastX128 = BigNumber('33819274971982470552721340282569211455911')
    const feeGrowthInside1LastX128 = BigNumber('58577573406703228483069725719999')
    const tick = -202779
    const decimals0 = 18
    const decimals1 = 6

    it('returns properly calculated fees', () => {
      expect(
        getFees(
          feeGrowthGlobal0X128,
          feeGrowthGlobal1X128,
          feeGrowthOutside0X128Lower,
          feeGrowthOutside0X128Upper,
          feeGrowthInside0LastX128,
          feeGrowthOutside1X128Lower,
          feeGrowthOutside1X128Upper,
          feeGrowthInside1LastX128,
          liquidity,
          decimals0,
          decimals1,
          tickLower,
          tickUpper,
          tick
        )
      ).toEqual({fees0: '0.004617939679200665', fees1: '7.225428'})
    });
  })
});
