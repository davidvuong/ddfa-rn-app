import * as actions from '../ActionTypes';

const initialState = {
  isLoggingIn: null,
  loginErrorStatus: null,
};

export default function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOG_IN_USER_REQUEST:
      return { ...state, isLoggingIn: true, loginErrorStatus: null };
    case actions.LOG_IN_USER_SUCCESS:
      return { ...state, isLoggingIn: false, loginErrorStatus: null };
    case actions.LOG_IN_USER_ERROR:
      return { ...state, isLoggingIn: false, loginErrorStatus: action.error, };
    default:
      return state;
  }
}
