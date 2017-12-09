// @flow
import { Platform } from 'react-native';

export default {
  checkInImage: {
    height: 180,
    width: null,
    flex: 1,
  },
  lastCheckedInText: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
    fontWeight: '500',
    fontStyle: 'italic',
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
  logoutButtonText: {
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
