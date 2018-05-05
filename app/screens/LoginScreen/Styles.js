import { Platform } from 'react-native';

export default {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  inputGroupContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 48,
  },
  inputStyle: {
    fontSize: 16,
  },
  loginButton: {
    marginLeft: 10,
    marginRight: 10,
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
