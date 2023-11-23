import { getRequest } from './functions'

const getTelegramLink = async () => {
  const response = await getRequest('/telegram_link')

  const body = await response.json()

  return body.link
};

export default getTelegramLink;
