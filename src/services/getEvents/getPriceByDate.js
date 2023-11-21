import asyncCallWithCache from '__helpers/asyncCallWithCache';
import getHistoricalPrice from '__services/getHistoricalPrice';

const getPriceByDate = async (token, timestamp) => {
  const cacheKey = `history_price_${token}_${timestamp}`
  const price = await asyncCallWithCache(cacheKey, getHistoricalPrice, token, timestamp)

  return price
};

export default getPriceByDate;
