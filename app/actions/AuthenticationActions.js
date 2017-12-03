// @flow
import * as actions from '../ActionTypes';
import AuthenticationService from '../services/AuthenticationService';

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

/* External */

export function loginUser(username: string, password: string) { // eslint-disable-line import/prefer-default-export
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
