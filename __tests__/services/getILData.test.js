import getILData from '__services/getILData';
import BigNumber from 'bignumber.js';

describe('getILData service', () => {
  describe("when lowerTick = '73430', upperTick = '76050'", () => {
    const lowerTick = '73430'
    const upperTick = '76050'
    const initialTick = '76046'
    const liquidity = '3554109264111449680947'
    const decimals0 = '18'
    const decimals1 = '18'

    describe("when tick = '74532'", () => {
      const tick = '74532'

      it('returns correct result', () => {
        const result = getILData(
          tick,
          initialTick,
          lowerTick,
          upperTick,
          liquidity,
          decimals0,
          decimals1,
        )
        expect(result).toEqual({
          impermanentLoss: 4.350798723968685,
          tickPrices: {
            price0: BigNumber('1724.7327067343867'),
            price1: BigNumber('0.00057979998645320674')
          },
          tickProportions: {
            amount0: BigNumber('6.254801275485025'),
            amount1: BigNumber('7912.473646894437')
          }
        });
      });
    });

    describe("when tick = '73430' (same as lower tick)", () => {
      const tick = lowerTick

      it('returns correct result', () => {
        const result = getILData(
          tick,
          initialTick,
          lowerTick,
          upperTick,
          liquidity,
          decimals0,
          decimals1,
        )
        expect(result).toEqual({
          impermanentLoss: 12.277619448705911,
          tickPrices: {
            price0: BigNumber('1544.7739600815653'),
            price1: BigNumber('0.00064734390004036526')
          },
          tickProportions: {
            amount0: BigNumber('11.10231343345822'),
            amount1: BigNumber('0')
          }
        });
      });

      describe("when initial tick = '76050' (same as upper tick)", () => {
        const initialTick = upperTick

        it('returns correct result', () => {
          const result = getILData(
            tick,
            initialTick,
            lowerTick,
            upperTick,
            liquidity,
            decimals0,
            decimals1,
          )
          expect(result).toEqual({
            impermanentLoss: 12.277648019672974,
            tickPrices: {
              price0: BigNumber('1544.7739600815653'),
              price1: BigNumber('0.00064734390004036526')
            },
            tickProportions: {
              amount0: BigNumber('11.10231343345822'),
              amount1: BigNumber('0')
            }
          });
        });
      })
    });

    describe("when tick = '76050' (same as upper tick)", () => {
      const tick = upperTick

      it('returns correct result', () => {
        const result = getILData(
          tick,
          initialTick,
          lowerTick,
          upperTick,
          liquidity,
          decimals0,
          decimals1,
        )
        expect(result).toEqual({
          impermanentLoss: 0.03995744525568272,
          tickPrices: {
            price0: BigNumber('2007.4484671855757'),
            price1: BigNumber('0.00049814479242996001')
          },
          tickProportions: {
            amount0: BigNumber('0'),
            amount1: BigNumber('19550.963125699446')
          }
        });
      });

      describe("when initial tick = '73430' (same as lower tick)", () => {
        const initialTick = lowerTick

        it('returns correct result', () => {
          const result = getILData(
            tick,
            initialTick,
            lowerTick,
            upperTick,
            liquidity,
            decimals0,
            decimals1,
          )
          expect(result).toEqual({
            impermanentLoss: 12.277648019672952,
            tickPrices: {
              price0: BigNumber('2007.4484671855757'),
              price1: BigNumber('0.00049814479242996001')
            },
            tickProportions: {
              amount0: BigNumber('0'),
              amount1: BigNumber('19550.963125699446')
            }
          });
        });
      })
    });

    describe("when tick = '76046' (same as initial tick)", () => {
      const tick = initialTick

      it('returns correct result', () => {
        const result = getILData(
          tick,
          initialTick,
          lowerTick,
          upperTick,
          liquidity,
          decimals0,
          decimals1,
        )
        expect(result).toEqual({
          impermanentLoss: 0,
          tickPrices: {
            price0: BigNumber('2006.6456885034063'),
            price1: BigNumber('0.00049834408023761216')
          },
          tickProportions: {
            amount0: BigNumber('0.01586573814949481'),
            amount1: BigNumber('19519.11984294546')
          }
        });
      });
    });
  });
});
