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
    height: 220,
  },
  placeCommentItem: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  commentInput: {
    textAlignVertical: 'top',
    fontSize: 14,
    minHeight: 120,
  },
};
