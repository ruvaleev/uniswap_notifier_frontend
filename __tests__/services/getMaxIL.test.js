import getMaxIL from '__services/getMaxIL';
import fulfilledPosition from '__mocks/fixtures/positions/fulfilledPosition';
import unfilledPosition from '__mocks/fixtures/positions/unfilledPosition';

describe('getMaxIL service', () => {
  describe('when fulfilled position provided', () => {
    it('returns proper data', () => {
      expect(getMaxIL(fulfilledPosition)).toEqual(2516.94)
    })
  })

  describe('when unfilled position provided', () => {
    it('returns zero', () => {
      expect(getMaxIL(unfilledPosition)).toEqual(0)
    })
  })
});
