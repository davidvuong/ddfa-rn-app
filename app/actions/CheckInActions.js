import * as actions from './ActionTypes';
import CheckInService from '../services/Api/CheckInService';

/* Internal */

function listCheckInsSuccess(checkIns, count) {
  return { type: actions.LIST_CHECK_INS_SUCCESS, checkIns, count };
}

function getNearbyCheckInsSuccess(checkIns) {
  return { type: actions.GET_NEARBY_CHECK_INS_SUCCESS, checkIns };
}

/* External */

export function listCheckIns(startTime) {
  return (dispatch) => {
    return CheckInService.list(startTime)
      .then((res) => {
        const { checkIns, count } = res;
        dispatch(listCheckInsSuccess(checkIns, count));
        return res;
      });
  };
}

export function getNearbyCheckIns(latitude, longitude) {
  return (dispatch) => {
    return CheckInService.getNearby(latitude, longitude)
      .then((checkIns) => {
        dispatch(getNearbyCheckInsSuccess(checkIns));
        return checkIns;
      });
  };
}

export function resetCheckIns() {
  return { type: actions.RESET_CHECK_IN_LIST };
}

export function setSelectedCheckIn(selectedCheckIn) {
  return { type: actions.SET_SELECTED_CHECK_IN, selectedCheckIn };
}

export function resetSelectedCheckIn() {
  return { type: actions.RESET_SELECTED_CHECK_IN };
}

export function setSelectedLocation(selectedLocation) {
  return { type: actions.SET_SELECTED_LOCATION, selectedLocation };
}

export function resetSelectedLocation() {
  return { type: actions.RESET_SELECTED_LOCATION };
}
