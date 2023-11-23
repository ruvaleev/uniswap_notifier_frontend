import { getRequest } from './functions'

const getTelegramLink = async () => {
  const response = await getRequest('/telegram_link')

  const body = await response.json()

  return body
};

export default getTelegramLink;
