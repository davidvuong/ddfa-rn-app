// @flow
import * as actions from '../ActionTypes';

type State = {
  isLoggingIn: boolean,
  loginErrorStatus: ?Error,
};

const initialState: State = {
  isLoggingIn: false,
  loginErrorStatus: null,
};

export default function AuthenticationReducer(state: State = initialState, action: *): State {
  switch (action.type) {
    case actions.LOGIN_USER_REQUEST:
      return { ...state, isLoggingIn: true, loginErrorStatus: null };
    case actions.LOGIN_USER_SUCCESS:
      return { ...state, isLoggingIn: false, loginErrorStatus: null };
    case actions.LOGIN_USER_ERROR:
      return { ...state, isLoggingIn: false, loginErrorStatus: action.error };
    default:
      return state;
  }
}
