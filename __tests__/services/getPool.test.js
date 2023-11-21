import { poolMock } from '__mocks/poolMock';
import getPool from '__services/getPool';

const feeGrowthGlobal0X128 = 1000n
const mockPoolContract = () => poolMock({ feeGrowthGlobal0X128 });

jest.mock('ethers', () => {
  const originalEthers = jest.requireActual('ethers');
  return {
    ethers: {
      ...originalEthers.ethers,
      Contract: jest.fn().mockImplementation(() => mockPoolContract())
    }
  };
});

describe('getPool', () => {
  const poolAddress = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
  const tickLower = 73430;
  const tickUpper = 76050;

  it('returns proper data retrieved from Contract', async () => {
    expect(await getPool(poolAddress, tickLower, tickUpper)).toEqual({
      feeGrowthGlobal0X128: feeGrowthGlobal0X128,
      feeGrowthGlobal1X128: 68965304012398033921151777400886n,
      highTickFeeGrowthOutside0X128: 302262195143298415259619494746838407729n,
      highTickFeeGrowthOutside1X128: 612076910341715108280663452272n,
      lowTickFeeGrowthOutside0X128: 1389446086837536329373633889581184202797n,
      lowTickFeeGrowthOutside1X128: 2477092305229384387505363697019n
    })
  });
});
