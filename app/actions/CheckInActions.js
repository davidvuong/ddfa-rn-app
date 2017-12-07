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

export function listCheckIns(startTime: string, limit: number) {
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

export function resetCheckIns() {
  return { type: actions.RESET_CHECK_IN_LIST };
}

export function setSelectedCheckIn(selectedCheckIn: *) {
  return { type: actions.SET_SELECTED_CHECK_IN, selectedCheckIn };
}

export function resetSelectedCheckIn() {
  return { type: actions.RESET_SELECTED_CHECK_IN };
}

export function setSelectedLocation(selectedLocation: Object) {
  return { type: actions.SET_SELECTED_LOCATION, selectedLocation };
}

