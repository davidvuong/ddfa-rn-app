import { combineReducers } from 'redux';

import AuthenticationReducer from './reducers/AuthenticationReducer';
import CheckInReducer from './reducers/CheckInReducer';
import GeoLocationReducer from './reducers/GeoLocationReducer';

export default function getReducer() {
  return combineReducers({
    authentication: AuthenticationReducer,
    checkIn: CheckInReducer,
    geoLocation: GeoLocationReducer,
  });
}
