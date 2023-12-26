const express = require('express');
const Rollbar = require('rollbar');
const path = require('path');
const app = express();

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_SERVER_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.ROLLBAR_ENABLED === 'true'
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/favicon.ico')));
app.use(rollbar.errorHandler());

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up on port ${port}!`);
});
