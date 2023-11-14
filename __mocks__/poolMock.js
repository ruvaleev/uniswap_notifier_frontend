const defaultAddress = '0xc6962004f452be9203591991d15f6b388e09e8d0'
const defaultFeeGrowthGlobal0X128 = {
  [defaultAddress]: 40196515228712633978884562398613552407144n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 231866973549814381671515894356835347n,
};
const defaultFeeGrowthGlobal1X128 = {
  [defaultAddress]: 68965304012398033921151777400886n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 355958040016600810747272579766178696896n,
};
const defaultLowTickFeeGrowthOutside0X128 = {
  [defaultAddress]: 1389446086837536329373633889581184202797n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 129362448994648287540025458230935296n,
};
const defaultLowTickFeeGrowthOutside1X128 = {
  [defaultAddress]: 2477092305229384387505363697019n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 175943338775698876993679593052051410691n,
};
const defaultHighTickFeeGrowthOutside0X128 = {
  [defaultAddress]: 302262195143298415259619494746838407729n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 7732267574321923988591945629151832n,
};
const defaultHighTickFeeGrowthOutside1X128 = {
  [defaultAddress]: 612076910341715108280663452272n,
  '0xc6f780497a95e246eb9449f5e4770916dcd6396a': 15751585567881134717540741437937252419n,
};

export const poolMock = ({
  address = defaultAddress,
  feeGrowthGlobal0X128 = defaultFeeGrowthGlobal0X128[address],
  feeGrowthGlobal1X128 = defaultFeeGrowthGlobal1X128[address],
  lowTickFeeGrowthOutside0X128 = defaultLowTickFeeGrowthOutside0X128[address],
  lowTickFeeGrowthOutside1X128 = defaultLowTickFeeGrowthOutside1X128[address],
  highTickFeeGrowthOutside0X128 = defaultHighTickFeeGrowthOutside0X128[address],
  highTickFeeGrowthOutside1X128 = defaultHighTickFeeGrowthOutside1X128[address],
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
