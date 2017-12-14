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
  checkedInAtText: {
    color: 'orange',
    fontWeight: '500',
    fontSize: 12,
  },
  mapView: {
    height: 220,
  },
};
