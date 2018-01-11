// @flow
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import CheckInListScreen from '../screens/CheckInListScreen/CheckInListScreen';
import CheckInDetailScreen from '../screens/CheckInDetailScreen/CheckInDetailScreen';
import ReviewCreateScreen from '../screens/ReviewCreateScreen/ReviewCreateScreen';

export default function getNavigator(isLoggedIn: ?boolean): * {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
    CheckInList: { screen: CheckInListScreen },
    CheckInDetail: { screen: CheckInDetailScreen },
    ReviewCreate: { screen: ReviewCreateScreen },
  }, {
    initialRouteName: isLoggedIn ? 'CheckInList' : 'Login',
  });
}
