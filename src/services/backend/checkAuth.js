const checkAuth = async () => {
  const response = await fetch(`${'BACKEND_URL'}/check_auth`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  return response.ok
};  

export default checkAuth;
