import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import CheckInScreen from '../screens/CheckInScreen/CheckInScreen';
import ReviewsScreen from '../screens/ReviewsScreen/ReviewsScreen';

// https://github.com/react-community/react-navigation/blob/master/docs/api/navigators/TabNavigator.md#tabnavigatorconfig
const BottomTabNavigator = TabNavigator({
  Feed: { screen: FeedScreen },
  CheckInScreen: { screen: CheckInScreen },
  ReviewsScreen: { screen: ReviewsScreen },
}, {
  lazy: true,
});

export default StackNavigator({
  Login: { screen: LoginScreen },
  BottomTabNavigator: { screen: BottomTabNavigator },
});
