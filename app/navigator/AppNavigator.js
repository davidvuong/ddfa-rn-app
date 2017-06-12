import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import LocationPickerScreen from '../screens/LocationPickerScreen/LocationPickerScreen';

export function getNavigator(isLoggedIn) {
  if (isLoggedIn === null) { return null; }

  return StackNavigator({
    Login: { screen: LoginScreen },
    Feed: { screen: FeedScreen },
    LocationPicker: { screen: LocationPickerScreen },
  }, {
    initialRouteName: isLoggedIn ? 'Feed' : 'Login',
  });
}
