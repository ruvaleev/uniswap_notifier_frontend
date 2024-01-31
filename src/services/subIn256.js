import { Q256, ZERO } from '__constants';

function subIn256(minuend, subtrahend) {
  const difference = minuend.minus(subtrahend);

  return difference.lt(ZERO) ? Q256.plus(difference) : difference;
}

export default subIn256;
