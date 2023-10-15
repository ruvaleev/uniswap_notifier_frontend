const defaultFeeGrowthGlobal0X128 = 40196515228712633978884562398613552407144n;
const defaultFeeGrowthGlobal1X128 = 68965304012398033921151777400886n;
const defaultLowTickFeeGrowthOutside0X128 = 1389446086837536329373633889581184202797n;
const defaultLowTickFeeGrowthOutside1X128 = 2477092305229384387505363697019n;
const defaultHighTickFeeGrowthOutside0X128 = 302262195143298415259619494746838407729n;
const defaultHighTickFeeGrowthOutside1X128 = 612076910341715108280663452272n;

export const poolMock = ({
  feeGrowthGlobal0X128 = defaultFeeGrowthGlobal0X128,
  feeGrowthGlobal1X128 = defaultFeeGrowthGlobal1X128,
  lowTickFeeGrowthOutside0X128 = defaultLowTickFeeGrowthOutside0X128,
  lowTickFeeGrowthOutside1X128 = defaultLowTickFeeGrowthOutside1X128,
  highTickFeeGrowthOutside0X128 = defaultHighTickFeeGrowthOutside0X128,
  highTickFeeGrowthOutside1X128 = defaultHighTickFeeGrowthOutside1X128,
} = {}) => {
  const ticksMock = jest.fn()
  ticksMock.mockResolvedValueOnce({
    feeGrowthOutside0X128: lowTickFeeGrowthOutside0X128,
    feeGrowthOutside1X128: lowTickFeeGrowthOutside1X128
  });
  ticksMock.mockResolvedValueOnce({
    feeGrowthOutside0X128: highTickFeeGrowthOutside0X128,
    feeGrowthOutside1X128: highTickFeeGrowthOutside1X128
  });
  return {
    feeGrowthGlobal0X128: jest.fn().mockReturnValue(Promise.resolve(feeGrowthGlobal0X128)),
    feeGrowthGlobal1X128: jest.fn().mockReturnValue(Promise.resolve(feeGrowthGlobal1X128)),
    ticks: ticksMock,
  };
};
