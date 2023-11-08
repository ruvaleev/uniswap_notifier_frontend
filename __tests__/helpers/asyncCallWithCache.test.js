import asyncCallWithCache from '__helpers/asyncCallWithCache';

describe('asyncCallWithCache', () => {
  const fn = jest.fn().mockImplementation(() => Promise.resolve(2))
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

      it("returns cached value and doesn't call function", async () => {
        const result = await asyncCallWithCache(key, fn, 3)

        expect(result).toEqual('1')
        expect(fn).not.toHaveBeenCalled()
      })
    });

    describe('when function call is not memoized yet', () => {
      it("calls function and saves returned value to cache", async () => {
        const result = await asyncCallWithCache(key, fn, 3)

        expect(result).toEqual(2)
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

      it("returns cached value and doesn't call function", async () => {
        const result = await asyncCallWithCache(key, fn)

        expect(result).toEqual('1')
        expect(fn).not.toHaveBeenCalled()
      })
    });

    describe('when function call is not memoized yet', () => {
      it("calls function and saves returned value to cache", async () => {
        const result = await asyncCallWithCache(key, fn)

        expect(result).toEqual(2)
        expect(fn).toHaveBeenCalledTimes(1)
        expect(localStorage.getItem(key)).toEqual('2')
      })
    });
  })
});
