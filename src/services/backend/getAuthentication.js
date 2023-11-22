const getAuthentication = async () => {
  const ethereum = window.ethereum;
  const message = "Please sign this message to authenticate.";
  const addresses = await ethereum.request({ method: 'eth_requestAccounts'})
  const selectedAddress = addresses[0]
  const signature = await ethereum.request({
    method: 'personal_sign',
    params: [selectedAddress, message]
  });

  const chainId = await ethereum.request({ method: 'eth_chainId'})
  const data = new URLSearchParams({
    'address': selectedAddress,
    'message': message,
    'signature': signature,
    'chain_id': chainId
  });

  const response = await fetch(`${process.env.BACKEND_URL}/authenticate`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data
  })

  return response.ok
};

export default getAuthentication
