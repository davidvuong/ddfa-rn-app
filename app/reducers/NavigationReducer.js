import { Navigator } from '../navigator/Navigator';

const stackInitialState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams('Login')
);

export function NavigationReducer(state = stackInitialState, action) {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state;
}
