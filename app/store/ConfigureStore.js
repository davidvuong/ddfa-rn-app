import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default function ConfigureStore(rootReducer) {
  return createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
  );
}
