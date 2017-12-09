// @flow
import { Platform } from 'react-native';

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
  mapView: {
    height: 100,
  },
};
