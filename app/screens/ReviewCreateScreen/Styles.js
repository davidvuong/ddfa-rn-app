import { Platform } from 'react-native';

export default {
  headerText: {
    ...Platform.select({
      ios: {
        color: 'black',
      },
      android: {
        color: 'white',
      },
    }),
  },
  headerBackIcon: {
    ...Platform.select({
      ios: {
        color: 'black',
      },
      android: {
        color: 'white',
      },
    }),
  },
  footerContainer: {
    height: 48,
    backgroundColor: 'white',
  },
  footerTab: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.15)',
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 14,
    color: 'black',
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
