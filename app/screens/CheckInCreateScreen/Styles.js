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
  placeContentItem: {
    borderBottomColor: 'rgba(0, 0, 0, .05)',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  placeRatingAndPrice: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 3,
    fontWeight: '500',
    color: 'orange',
  },
  placeRatingStarIcon: {
    fontSize: 12,
    color: 'orange',
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
