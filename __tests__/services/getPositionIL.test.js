import BigNumber from 'bignumber.js';

import getPositionIL from '__services/getPositionIL';
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import unfilledPosition from '__mocks/fixtures/positions/unfilledPosition';

describe('getPositionIL service', () => {
  describe('when fulfilled position provided', () => {
    it('returns proper data', () => {
      expect(getPositionIL(fulfilledPosition)).toEqual({
        percent: BigNumber('4.30928342151307137626'),
        usd: BigNumber('923.198122877088718885234')
      })
    })
  })

  describe('when unfilled position provided', () => {
    it('returns zero', () => {
      expect(getPositionIL(unfilledPosition)).toEqual({percent: BigNumber('0'), usd: BigNumber('0')})
    })
  })
});
