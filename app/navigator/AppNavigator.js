// @flow
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';

export default function getNavigator(isLoggedIn: ?boolean) {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
    Feed: { screen: FeedScreen },
  }, {
    initialRouteName: isLoggedIn ? 'Feed' : 'Login',
  });
}
