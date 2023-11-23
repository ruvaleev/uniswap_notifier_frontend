import UnauthenticatedError from '__src/errors/UnauthenticatedError';
import { getRequest } from './functions'

const checkAuth = async () => {
  const response = await getRequest('/check_auth')
    .catch(error => {
      if (error instanceof(UnauthenticatedError)) {
        return {ok: false}
      } else {
        throw(error);
      }
    })

  return response.ok
};

export default checkAuth;
