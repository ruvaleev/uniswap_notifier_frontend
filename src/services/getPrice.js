import { COINGECKO_CURRENCIES } from '__constants';

async function getPrice(tokens) {
  if (tokens.length === 0) { return {} }

  const ids = tokens.map((symbol) => COINGECKO_CURRENCIES[symbol]).join()
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
  const data = await response.json();

  return tokens.reduce((result, symbol) => {
    result[symbol] = data[COINGECKO_CURRENCIES[symbol]]?.usd
    return result
  }, {});
}

export default getPrice;
