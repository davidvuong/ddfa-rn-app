import { createStore, combineReducers } from 'redux';

import CheckInsReducer from '../reducers/CheckInsReducer';

export default function ConfigureStore() {
  return createStore(
    combineReducers({
      checkIns: CheckInsReducer,
    }), {}
  );
}
