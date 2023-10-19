import BigNumber from 'bignumber.js';

const moneyFormat = (input) => {
  return `$${BigNumber(input).toFixed(2)}`
};

export default moneyFormat;
