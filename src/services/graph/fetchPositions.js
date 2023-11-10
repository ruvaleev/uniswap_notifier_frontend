import { POSITIONS_FIELDS } from '__constants';
import { postRequest } from './functions';

const buildPositionsQuery = (ownerAddress) => JSON.stringify({query: `
  {
    positions(where: {owner: "${ownerAddress}", liquidity_gt: 0}) {
      ${POSITIONS_FIELDS}
    }
  }
`});

const fetchPositions = async (ownerAddress) => (
  postRequest(
    buildPositionsQuery(ownerAddress),
    (json) => json.data.positions
  )
)

export default fetchPositions;
