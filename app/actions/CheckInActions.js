// @flow
import * as actions from '../ActionTypes';
import CheckInService from '../services/CheckInService';

/* Internal */

function listCheckInRequest() {
  return { type: actions.LIST_CHECK_IN_REQUEST };
}

function listCheckInSuccess(checkIns: Array<*>) {
  return { type: actions.LIST_CHECK_IN_SUCCESS, checkIns };
}

function listCheckInError(error: Error) {
  return { type: actions.LIST_CHECK_IN_ERROR, error };
}

/* External */

export function listCheckIns(startTime: string, limit: number) { // eslint-disable-line import/prefer-default-export
  return (dispatch: *) => {
    dispatch(listCheckInRequest());
    return CheckInService.list(startTime, limit)
      .then((checkIns: *) => {
        dispatch(listCheckInSuccess(checkIns));
      }, (error: Error) => {
        dispatch(listCheckInError(error));
        throw error;
      });
  };
}
