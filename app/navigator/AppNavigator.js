import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';

export function getNavigator(isLoggedIn) {
  if (isLoggedIn === null) { return null; }

  return StackNavigator({
    Login: { screen: LoginScreen },
    Feed: { screen: FeedScreen },
    CheckIn: { screen: CheckInScreen },
  }, {
    initialRouteName: isLoggedIn ? 'Feed' : 'Login',
  });
}
