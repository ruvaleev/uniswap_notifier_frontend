async function asyncCallWithCache(key, fn, ...args) {
  const memoizedValue = localStorage.getItem(key)
  if (memoizedValue) { return memoizedValue }

  const result = await fn(...args)
  localStorage.setItem(key, result)

  return result
}

export default asyncCallWithCache;
