import { combineReducers } from 'redux';
import CheckInReducer from './CheckInReducer';

export default function getReducer() {
  return combineReducers({
    checkIn: CheckInReducer,
  });
}
