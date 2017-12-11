// @flow
import RNConfig from 'react-native-config';

export type ApiConfig = {
  host: string,
  port: number,
};

export type Config = {
  api: ApiConfig,
};

function loadUnsafe() {
  return {
    API_HOST: RNConfig.API_HOST,
    API_PORT: parseInt(RNConfig.API_PORT, 10),
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
