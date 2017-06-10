import { combineReducers } from 'redux';

import AuthenticationReducer from './reducers/AuthenticationReducer';

export default function getReducer() {
  return combineReducers({
    authentication: AuthenticationReducer,
  });
}


