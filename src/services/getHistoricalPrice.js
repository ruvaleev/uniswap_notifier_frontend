import { COINGECKO_CURRENCIES } from '__constants';
import dateWithHyphens from '__helpers/dateWithHyphens';

async function getHistoricalPrice(token, timestamp) {
  const date = dateWithHyphens(timestamp * 1000)

  const id = COINGECKO_CURRENCIES[token]
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error)
  }
  else {
    return data.market_data.current_price.usd
  }
}

export default getHistoricalPrice;
