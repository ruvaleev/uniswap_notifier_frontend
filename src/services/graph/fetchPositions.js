import { POSITIONS_FIELDS } from '__constants';

const buildPositionsQuery = (ownerAddress) => JSON.stringify({query: `
  {
    positions(where: {owner: "${ownerAddress}", liquidity_gt: 0}) {
      ${POSITIONS_FIELDS}
    }
  }
`});

const serializedErrors = (json) => {
  return {
    errors:
      json.error
        ? [json.error]
        : json.errors.map((err) => err.message)
  }
}

const fetchPositions = async (ownerAddress) => {
  const response = await fetch('https://api.thegraph.com/subgraphs/name/revert-finance/uniswap-v3-arbitrum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: buildPositionsQuery(ownerAddress),
  });

  const json = await response.json();

  return !response.ok || json.errors
    ? serializedErrors(json)
    : json.data.positions;
};

export default fetchPositions;
