import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';

const BottomTabNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  CheckInScreen: { screen: CheckInScreen },
});

export default StackNavigator({
  Login: { screen: LoginScreen },
  BottomTabNavigator: { screen: BottomTabNavigator },
});
