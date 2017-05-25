import { createStore } from 'redux';

export default function ConfigureStore(reducer, initialState) {
  return createStore(
    reducer,
    initialState
  );
}
