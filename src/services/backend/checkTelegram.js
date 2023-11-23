import { getRequest } from './functions'

const checkTelegram = async () => {
  const response = await getRequest('/check_telegram')

  const body = await response.json()

  return body
};

export default checkTelegram;
