import UnauthenticatedError from '__src/errors/UnauthenticatedError';

const makeRequest = async (method, endpoint) => {
  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })

  if (response.status === 401) { throw new UnauthenticatedError }

  return response
};

export const getRequest = async (endpoint) => makeRequest('GET', endpoint);
export const patchRequest = async (endpoint) => makeRequest('PATCH', endpoint);
