import { getRequest } from './functions'

const getNotificationsSetting = async () => {
  const response = await getRequest('/notifications_setting')

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error)
  }
  else {
    return data
  }
};

export default getNotificationsSetting;
