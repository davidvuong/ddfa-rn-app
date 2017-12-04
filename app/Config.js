// @flow

export type ApiConfig = {
  host: string,
  port: number,
};

export type Config = {
  api: ApiConfig,
};

function loadUnsafe() {
  return {
    API_HOST: process.env.API_HOST || 'http://localhost',
    API_PORT: parseInt(process.env.API_PORT, 10) || 8080,
  };
}

export default function loadConfig(): Config {
  const env = loadUnsafe();
  return {
    api: {
      host: env.API_HOST,
      port: env.API_PORT,
    },
  };
}
