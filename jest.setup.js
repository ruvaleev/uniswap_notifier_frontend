import '@testing-library/jest-dom'
import loadEnv from './loadEnv';

const envVars = loadEnv();
for (const key in envVars) {
  window[key] = envVars[key];
}
