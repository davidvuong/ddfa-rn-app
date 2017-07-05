import concat from 'lodash/concat';
import * as actions from '../ActionTypes';

const initialState = {
  // Check in progress status.
  isCheckingIn: null,

  // Check in error response object.
  checkInErrorStatus: null,

  // The location we've selected to check in.
  selectedLocation: null,

  // Previously checked in resources (possibly including newest).
  checkIns: [],

  // Status of retrieving checkIn resources.
  isListingCheckIns: null,

  // Check in list error response object.
  checkInListErrorStatus: null,
};

export default function CheckInReducer(state = initialState, action) {
  switch (action.type) {
  case actions.CHECK_IN_REQUEST:
    return { ...state, isCheckingIn: true, checkInErrorStatus: null };
  case actions.CHECK_IN_SUCCESS:
    return {
      ...state,
      isCheckingIn: false,
      checkInErrorStatus: null,
      selectedLocation: null,
    };
  case actions.CHECK_IN_ERROR:
    return { ...state, isCheckingIn: false, checkInErrorStatus: action.error };
  case actions.SET_SELECTED_LOCATION:
    return { ...state, selectedLocation: action.selectedLocation };
  case actions.LIST_CHECK_IN_REQUEST:
    return { ...state, isListingCheckIns: true };
  case actions.LIST_CHECK_IN_SUCCESS:
    return {
      ...state,
      checkIns: concat(state.checkIns, action.checkIns),
      isListingCheckIns: false,
      checkInListErrorStatus: null,
    };
  case actions.LIST_CHECK_IN_ERROR:
    return {
      ...state,
      isListingCheckIns: false,
      checkInListErrorStatus: action.error,
    };
  default:
    return state;
  }
}
