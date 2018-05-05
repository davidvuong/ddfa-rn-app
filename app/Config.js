import RNConfig from 'react-native-config';

function loadUnsafe() {
  return {
    API_HOST: RNConfig.API_HOST,
    API_PORT: parseInt(RNConfig.API_PORT, 10),
  };
}

export default function loadConfig() {
  const env = loadUnsafe();
  return {
    api: {
      host: env.API_HOST,
      port: env.API_PORT,
    },
  };
}
