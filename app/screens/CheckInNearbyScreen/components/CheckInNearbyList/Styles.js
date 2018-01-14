// @flow
import { Platform } from 'react-native';

export default {
  emptyCheckInsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyCheckInsText: {
    fontStyle: 'italic',
  },
  listContainer: {
    marginLeft: -14,
  },
  listItemContainer: {
    paddingLeft: 6,
  },
  listItemBody: {
    marginLeft: 5,
  },
  listItemDetailedText: {
    paddingTop: 3,
    color: 'orange',
    fontSize: 11,
    fontWeight: '600',
  },
  navigateIcon: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.75)',
  },
  navigateButton: {
    ...Platform.select({
      ios: {
        width: 25,
      },
    }),
  },
  thumbnail: {
    width: 46,
    height: 46,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
