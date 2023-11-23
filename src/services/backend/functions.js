import UnauthenticatedError from '__src/errors/UnauthenticatedError';

export const getRequest = async (endpoint) => {
  const response = await fetch(`${process.env.BACKEND_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })

  if (response.status === 401) { throw new UnauthenticatedError }

  return response
};
