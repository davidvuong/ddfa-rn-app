import { combineReducers } from 'redux';

import AuthenticationReducer from './reducers/AuthenticationReducer';
import CheckInsReducer from './reducers/CheckInsReducer';
import GeoLocationReducer from './reducers/GeoLocationReducer';

export default function getReducer() {
  return combineReducers({
    authentication: AuthenticationReducer,
    checkIns: CheckInsReducer,
    geoLocation: GeoLocationReducer,
  });
}
