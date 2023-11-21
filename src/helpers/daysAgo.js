function daysAgo(timestamp) {
  const date = new Date(+timestamp);

  return (new Date() - date) / (1000 * 60 * 60 * 24)
}

export default daysAgo;
