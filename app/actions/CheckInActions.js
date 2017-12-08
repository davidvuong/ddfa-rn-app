// @flow
import * as actions from '../ActionTypes';
import CheckInService from '../services/CheckInService';

/* Internal */

function createCheckInRequest() {
  return { type: actions.CREATE_CHECK_IN_REQUEST };
}

function createCheckInSuccess() {
  return { type: actions.CREATE_CHECK_IN_SUCCESS };
}

function createCheckInError(error: Error) {
  return { type: actions.CREATE_CHECK_IN_ERROR, error };
}

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

export function createCheckIn(
  latitude: number,
  longitude: number,
  address: string,
  name: string,
  comment: ?string,
  rating: ?number,
  isPaying: boolean,
  amountPaid: ?number,
) {
  return (dispatch: *) => {
    dispatch(createCheckInRequest());
    return CheckInService.create(
      latitude,
      longitude,
      address,
      name,
      comment,
      rating,
      isPaying,
      amountPaid,
    ).then(() => {
      dispatch(createCheckInSuccess());
    }, (error: Error) => {
      dispatch(createCheckInError(error));
      throw error;
    });
  };
}

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

export function setSelectedLocation(selectedLocation: *) {
  return { type: actions.SET_SELECTED_LOCATION, selectedLocation };
}

export function resetSelectedLocation() {
  return { type: actions.RESET_SELECTED_LOCATION };
}
