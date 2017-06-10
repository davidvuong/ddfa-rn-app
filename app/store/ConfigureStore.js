import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthenticationReducer from '../reducers/AuthenticationReducer';
import TemporaryReducer from '../reducers/TemporaryReducer';

export default function ConfigureStore() {
  const combinedReducers = combineReducers({
    tmp: TemporaryReducer,
    authentication: AuthenticationReducer,
  });

  return createStore(
    combinedReducers,
    {},
    applyMiddleware(thunk)
  );
}
