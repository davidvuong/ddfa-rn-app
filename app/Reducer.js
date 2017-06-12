import { combineReducers } from 'redux';

import AuthenticationReducer from './reducers/AuthenticationReducer';
import GeoLocationReducer from './reducers/GeoLocationReducer';

export default function getReducer() {
  return combineReducers({
    authentication: AuthenticationReducer,
    geolocation: GeoLocationReducer,
  });
}
