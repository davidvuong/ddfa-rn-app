// @flow
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

export function getNavigator(isLoggedIn: ?boolean): ?StackNavigator { // eslint-disable-line import/prefer-default-export, max-len
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
  }, {
    initialRouteName: 'Login',
  });
}
