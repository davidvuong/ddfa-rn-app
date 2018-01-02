// @flow
import * as actions from '../ActionTypes';
import AuthenticationService from '../services/Api/AuthenticationService';

/* Internal */

function loginRequest() {
  return { type: actions.LOGIN_USER_REQUEST };
}

function loginSuccess() {
  return { type: actions.LOGIN_USER_SUCCESS };
}

function loginError(error: Error) {
  return { type: actions.LOGIN_USER_ERROR, error };
}

function logoutRequest() {
  return { type: actions.LOGOUT_USER_REQUEST };
}

function logoutSuccess() {
  return { type: actions.LOGOUT_USER_SUCCESS };
}

function logoutError(error: Error) {
  return { type: actions.LOGOUT_USER_ERROR, error };
}

/* External */

export function loginUser(username: string, password: string) {
  return (dispatch: *) => {
    dispatch(loginRequest());
    return AuthenticationService.login(username, password)
      .then(() => { dispatch(loginSuccess()); })
      .catch((error: Error) => {
        dispatch(loginError(error));
        throw error;
      });
  };
}

export function logoutUser() {
  return (dispatch: *) => {
    dispatch(logoutRequest());
    return AuthenticationService.logout()
      .then(() => { dispatch(logoutSuccess()); })
      .catch((error: Error) => {
        dispatch(logoutError(error));
        throw error;
      });
  };
}
