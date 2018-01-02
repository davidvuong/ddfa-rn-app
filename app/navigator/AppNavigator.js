// @flow
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import CheckInListScreen from '../screens/CheckInListScreen/CheckInListScreen';
import CheckInDetailScreen from '../screens/CheckInDetailScreen/CheckInDetailScreen';
import CheckInCreateScreen from '../screens/CheckInCreateScreen/CheckInCreateScreen';

export default function getNavigator(isLoggedIn: ?boolean): * {
  if (isLoggedIn === null) { return null; }
  return StackNavigator({
    Login: { screen: LoginScreen },
    CheckInList: { screen: CheckInListScreen },
    CheckInDetail: { screen: CheckInDetailScreen },
    CheckInCreate: { screen: CheckInCreateScreen },
  }, {
    initialRouteName: isLoggedIn ? 'CheckInList' : 'Login',
  });
}
