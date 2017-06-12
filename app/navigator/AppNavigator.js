import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import CheckIn from '../screens/CheckInScreen/CheckIn';
import LocationPickerScreen from '../screens/LocationPickerScreen/LocationPickerScreen';

export function getNavigator(isLoggedIn) {
  if (isLoggedIn === null) { return null; }

  return StackNavigator({
    Login: { screen: LoginScreen },
    Feed: { screen: FeedScreen },
    CheckIn: { screen: CheckIn },
    LocationPicker: { screen: LocationPickerScreen },
  }, {
    initialRouteName: isLoggedIn ? 'Feed' : 'Login',
  });
}
