import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';
import ReviewsScreen from '../screens/ReviewsScreen/ReviewsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

// https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/TabNavigator.md#tabnavigatorconfig
const BottomTabNavigator = TabNavigator({
  FeedScreen: { screen: FeedScreen },
  CheckInScreen: { screen: CheckInScreen },
  ReviewsScreen: { screen: ReviewsScreen },
  ProfileScreen: { screen: ProfileScreen },
}, {
  lazy: true,
});

export default StackNavigator({
  Login: { screen: LoginScreen },
  BottomTabNavigator: { screen: BottomTabNavigator },
});
