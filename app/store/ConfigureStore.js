import { createStore, combineReducers } from 'redux';

import TemporaryReducer from '../reducers/TemporaryReducer';

export default function ConfigureStore() {
  return createStore(
    combineReducers({
      tmp: TemporaryReducer,
    }), {}
  );
}
