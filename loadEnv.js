const fs = require('fs');
const path = require('path');

const loadEnv = () => {
  const environment = process.env.NODE_ENV || 'development';
  let envPath = path.resolve(__dirname, `.env.${environment}`);

  if (!fs.existsSync(envPath)) {
    // eslint-disable-next-line no-console
    console.warn(`.env.${environment} file not found, falling back to .env`);
    envPath = path.resolve(__dirname, '.env');
  }

  const envConfig = fs.readFileSync(envPath, 'utf8');
  const fileEnv = Object.fromEntries(
    envConfig.split('\n')
      .filter(line => line.trim() !== '' && line.includes('='))
      .map(line => {
        const [key, value] = line.split('=');
        return [key, value];
      })
  );

  return Object.keys(fileEnv).reduce((acc, key) => {
    acc[key] = JSON.stringify(process.env[key]) || fileEnv[key];
    return acc;
  }, {});
}

module.exports = loadEnv;
