// @flow
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

export default function getNavigator(isLoggedIn: ?boolean) {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
  }, {
    initialRouteName: 'Login',
  });
}
