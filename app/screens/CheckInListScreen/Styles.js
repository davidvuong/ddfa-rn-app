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
    position: 'absolute',
    top: 2,
    right: 5,
    fontStyle: 'italic',
    fontSize: 12,
  },
  refreshButton: {
    marginRight: 5,
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
    fontSize: 16,
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
