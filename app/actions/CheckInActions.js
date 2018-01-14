// @flow
import * as actions from './ActionTypes';
import CheckInService from '../services/Api/CheckInService';

/* Internal */

function listCheckInsSuccess(checkIns: Array<*>) {
  return { type: actions.LIST_CHECK_INS_SUCCESS, checkIns };
}

function getNearbyCheckInsSuccess(checkIns: Array<*>) {
  return { type: actions.GET_NEARBY_CHECK_INS_SUCCESS, checkIns };
}

/* External */

export function listCheckIns(startTime: string) {
  return (dispatch: *) => {
    return CheckInService.list(startTime)
      .then((checkIns: Array<*>) => {
        dispatch(listCheckInsSuccess(checkIns));
        return checkIns;
      });
  };
}

export function getNearbyCheckIns(latitude: number, longitude: number) {
  return (dispatch: *) => {
    return CheckInService.getNearby(latitude, longitude)
      .then((checkIns: Array<*>) => {
        dispatch(getNearbyCheckInsSuccess(checkIns));
        return checkIns;
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
