// @flow
import _ from 'lodash';
import * as actions from '../ActionTypes';

type State = {
  isCheckingIn: boolean,
  checkInErrorStatus: ?Error,
  checkIns: Array<*>,
  isListingCheckIns: boolean,
  checkInListErrorStatus: ?Error,
  selectedLocation: *,
  selectedCheckIn: *,
};

const initialState: State = {
  // Check in progress status.
  isCheckingIn: false,

  // Check in error response object.
  checkInErrorStatus: null,

  // The location we've selected to check in.
  selectedLocation: null,

  // The selected checkIn to view when in detailed page.
  selectedCheckIn: null,

  // Previously checked in resources (possibly including newest).
  checkIns: [],

  // Status of retrieving checkIn resources.
  isListingCheckIns: false,

  // Check in list error response object.
  checkInListErrorStatus: null,
};

export default function CheckInReducer(state: State = initialState, action: *): State {
  switch (action.type) {
    case actions.CREATE_CHECK_IN_REQUEST:
      return { ...state, isCheckingIn: true, checkInErrorStatus: null };
    case actions.CREATE_CHECK_IN_SUCCESS:
      return {
        ...state,
        isCheckingIn: false,
        checkInErrorStatus: null,
      };
    case actions.CREATE_CHECK_IN_ERROR:
      return { ...state, isCheckingIn: false, checkInErrorStatus: action.error };
    case actions.LIST_CHECK_IN_REQUEST:
      return { ...state, isListingCheckIns: true };
    case actions.LIST_CHECK_IN_SUCCESS:
      return {
        ...state,
        checkIns: _.concat(state.checkIns, action.checkIns),
        isListingCheckIns: false,
        checkInListErrorStatus: null,
      };
    case actions.LIST_CHECK_IN_ERROR:
      return {
        ...state,
        isListingCheckIns: false,
        checkInListErrorStatus: action.error,
      };
    case actions.SET_SELECTED_CHECK_IN:
      return { ...state, selectedCheckIn: action.selectedCheckIn };
    case actions.RESET_SELECTED_CHECK_IN:
      return { ...state, selectedCheckIn: null };
    case actions.RESET_CHECK_IN_LIST:
      return {
        ...state,
        isListingCheckIns: null,
        checkIns: [],
        checkInListErrorStatus: null,
      };
    case actions.SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.selectedLocation };
    case actions.RESET_SELECTED_LOCATION:
      return { ...state, selectedLocation: null };
    default:
      return state;
  }
}
