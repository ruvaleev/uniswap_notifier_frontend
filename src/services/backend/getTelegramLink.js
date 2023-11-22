import UnauthenticatedError from '__src/errors/UnauthenticatedError';

const getTelegramLink = async () => {
  const response = await fetch(`${BACKEND_URL}/telegram_link`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  if (response.status === 401) { throw new UnauthenticatedError }

  const body = await response.json()

  return body.link
};  

export default getTelegramLink;
