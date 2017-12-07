// @flow
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import CheckInListScreen from '../screens/CheckInListScreen/CheckInListScreen';

export default function getNavigator(isLoggedIn: ?boolean) {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
    CheckInList: { screen: CheckInListScreen },
  }, {
    initialRouteName: isLoggedIn ? 'CheckInList' : 'Login',
  });
}
