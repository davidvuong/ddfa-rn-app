// @flow
import { combineReducers } from 'redux';

import AuthenticationReducer from './reducers/AuthenticationReducer';
import CheckInReducer from './reducers/CheckInReducer';

export default function getReducer() {
  return combineReducers({
    authentication: AuthenticationReducer,
    checkIn: CheckInReducer,
  });
}
