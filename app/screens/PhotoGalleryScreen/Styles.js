import { Platform } from 'react-native';

// TODO: Define common styles to share between all screens.
export default {
  headerTitle: {
    ...Platform.select({
      ios: {
        color: 'black',
      },
      android: {
        color: 'white',
      },
    }),
  },
};
