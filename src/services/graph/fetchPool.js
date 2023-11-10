import { POOLS_FIELDS } from '__constants';
import { postRequest } from './functions';

const buildPoolQuery = (poolAddress, blockNumber) => JSON.stringify({query: `
  {
    pools(where: {id: "${poolAddress}"}, block: {number: ${blockNumber}}) {
      ${POOLS_FIELDS}
    }
  }
`});

const fetchPool = async (poolAddress, blockNumber) => (
  postRequest(
    buildPoolQuery(poolAddress, blockNumber),
    (json) => json.data.pools[0]
  )
)

export default fetchPool;
