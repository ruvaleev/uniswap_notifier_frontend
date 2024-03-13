import { patchRequest } from './functions'

const updateNotificationsSetting = async (params) => {
  const urlParams = new URLSearchParams(params)
  const response = await patchRequest(`/notifications_setting?${urlParams.toString()}`)

  return response.ok
};

export default updateNotificationsSetting;
