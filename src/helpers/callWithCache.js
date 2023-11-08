function callWithCache(key, fn, ...args) {
  const memoizedValue = localStorage.getItem(key)
  if (memoizedValue) { return memoizedValue }

  const result = fn(...args)
  localStorage.setItem(key, result)

  return result
}

export default callWithCache;
