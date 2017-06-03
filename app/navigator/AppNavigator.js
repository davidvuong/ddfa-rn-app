import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';
import ReviewsScreen from '../screens/ReviewsScreen/ReviewsScreen';

// https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/TabNavigator.md#tabnavigatorconfig
const BottomTabNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  CheckInScreen: { screen: CheckInScreen },
  ReviewsScreen: { screen: ReviewsScreen },
}, {
  lazy: true,
});

export default StackNavigator({
  Login: { screen: LoginScreen },
  BottomTabNavigator: { screen: BottomTabNavigator },
});
