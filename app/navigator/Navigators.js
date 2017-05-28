import {
  StackNavigator as ReactStackNavigator,
  TabNavigator as ReactTabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';

export const StackNavigator = ReactStackNavigator({
  Login: { screen: LoginScreen },
});

export const TabNavigator = ReactTabNavigator({
  Home: { screen: HomeScreen },
  CheckInScreen: { screen: CheckInScreen },
});
