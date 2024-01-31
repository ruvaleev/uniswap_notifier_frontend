import BigNumber from 'bignumber.js';
import subIn256 from '__services/subIn256';

describe('subIn256', () => {
  describe('when subtrahend is greater than minuend', () => {
    const minuend = BigNumber('170866104293983785936701988696208083');
    const subtrahend = BigNumber('115792089237316195423570985008687907853269827778273973174559328181232415810364');

    it('returns properly result', () => {
      expect(
        subIn256(minuend, subtrahend)
      ).toEqual(BigNumber('327753470884848684192528669410037655'))
    });
  })

  describe('when subtrahend is less than minuend', () => {
    const minuend = BigNumber('38801535727909269532917328293691613330053');
    const subtrahend = BigNumber('33819274971982470552721340282569211455911');

    it('returns properly result', () => {
      expect(
        subIn256(minuend, subtrahend)
      ).toEqual(BigNumber('4982260755926798980195988011122401874142'))
    });
  })
});
