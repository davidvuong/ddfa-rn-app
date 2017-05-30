import {
  StackNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';

export const Navigator = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  CheckInScreen: { screen: CheckInScreen },
});
