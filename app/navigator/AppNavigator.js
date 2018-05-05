import {
  StackNavigator,
  NavigationActions,
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import CheckInListScreen from '../screens/CheckInListScreen/CheckInListScreen';
import CheckInDetailScreen from '../screens/CheckInDetailScreen/CheckInDetailScreen';
import CheckInNearbyScreen from '../screens/CheckInNearbyScreen/CheckInNearbyScreen';
import ReviewCreateScreen from '../screens/ReviewCreateScreen/ReviewCreateScreen';

export default function getNavigator(isLoggedIn) {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
    CheckInList: { screen: CheckInListScreen },
    CheckInDetail: { screen: CheckInDetailScreen },
    CheckInNearby: { screen: CheckInNearbyScreen },
    ReviewCreate: { screen: ReviewCreateScreen },
  }, {
    initialRouteName: isLoggedIn ? 'CheckInList' : 'Login',
  });
}

export function navigateAndReset(routeName, navigation) {
  return navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName }),
    ],
  }));
}
