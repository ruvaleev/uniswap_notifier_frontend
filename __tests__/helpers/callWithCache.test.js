import callWithCache from '__helpers/callWithCache';

describe('callWithCache', () => {
  const fn = jest.fn().mockImplementation(() => 2)
  const key = 'key';

  afterEach(() => {
    localStorage.removeItem(key)
    fn.mockClear()
  })

  describe('when provided function expects arguments', () => {
    describe('when function call is memoized already', () => {
      beforeAll(() => {
        localStorage.setItem(key, '1')
      })

      it("returns cached value and doesn't call function", () => {
        expect(callWithCache(key, fn, 3)).toEqual('1')
        expect(fn).not.toHaveBeenCalled()
      })
    });

    describe('when function call is not memoized yet', () => {
      it("calls function and saves returned value to cache", () => {
        expect(callWithCache(key, fn, 3)).toEqual(2)
        expect(fn).toHaveBeenCalledWith(3)
        expect(localStorage.getItem(key)).toEqual('2')
      })
    });
  });

  describe("when provided function doesn't expect arguments", () => {
    describe('when function call is memoized already', () => {
      beforeAll(() => {
        localStorage.setItem(key, '1')
      })

      it("returns cached value and doesn't call function", () => {
        expect(callWithCache(key, fn)).toEqual('1')
        expect(fn).not.toHaveBeenCalled()
      })
    });

    describe('when function call is not memoized yet', () => {
      it("calls function and saves returned value to cache", () => {
        expect(callWithCache(key, fn)).toEqual(2)
        expect(fn).toHaveBeenCalledTimes(1)
        expect(localStorage.getItem(key)).toEqual('2')
      })
    });
  })
});
