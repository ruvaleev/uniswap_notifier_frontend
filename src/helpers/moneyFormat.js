import BigNumber from 'bignumber.js';

const moneyFormat = (input) => {
  return (
    input
    ? `$${BigNumber(input).toFixed(2)}`
    : ' ... '
  )
};

export default moneyFormat;
