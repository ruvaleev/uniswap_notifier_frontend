const serializedErrors = (json) => {
  return {
    errors:
      json.error
        ? [json.error]
        : json.errors.map((err) => err.message)
  }
}

export const postRequest = async (body, parseResponseFn) => {
  const response = await fetch('https://api.thegraph.com/subgraphs/name/revert-finance/uniswap-v3-arbitrum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body,
  });

  const json = await response.json();

  return !response.ok || json.errors
    ? serializedErrors(json)
    : parseResponseFn(json);
};
