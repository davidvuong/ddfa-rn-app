import {
  TabNavigator, StackNavigator
} from '../navigator/Navigators';

/* TabNavigator initial state and reducer... */

const tabInitialState = TabNavigator.router.getStateForAction(
  TabNavigator.router.getActionForPathAndParams('Home')
);

export function TabNavigationReducer(state = tabInitialState, action) {
  const nextState = TabNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

/* StackNavigator initial state and reducer... */

const stackInitialState = StackNavigator.router.getStateForAction(
  StackNavigator.router.getActionForPathAndParams('Login')
);

export function StackNavigationReducer(state = stackInitialState, action) {
  const nextState = StackNavigator.router.getStateForAction(action, state);
  return nextState || state;
}
