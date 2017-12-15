// @flow
import { Platform } from 'react-native';

export default {
  checkInImage: {
    height: 180,
    width: null,
    flex: 1,
  },
  checkedInAtCardItem: {
    height: 12,
  },
  checkedInAtText: {
    color: 'orange',
    fontWeight: '500',
    fontSize: 12,
  },
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
