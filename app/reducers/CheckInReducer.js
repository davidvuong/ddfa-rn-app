// @flow
import _ from 'lodash';
import * as actions from '../ActionTypes';

type State = {
  isCheckingIn: ?boolean,
  checkInErrorStatus: ?Error,
  checkIns: Array<*>,
  isListingCheckIns: ?boolean,
  checkInListErrorStatus: ?Error,
};

const initialState = {
  // Check in progress status.
  isCheckingIn: null,

  // Check in error response object.
  checkInErrorStatus: null,

  // Previously checked in resources (possibly including newest).
  checkIns: [],

  // Status of retrieving checkIn resources.
  isListingCheckIns: null,

  // Check in list error response object.
  checkInListErrorStatus: null,
};

export default function CheckInReducer(state: State = initialState, action: *) {
  switch (action.type) {
    case actions.CHECK_IN_REQUEST:
      return { ...state, isCheckingIn: true, checkInErrorStatus: null };
    case actions.CHECK_IN_SUCCESS:
      return {
        ...state,
        isCheckingIn: false,
        checkInErrorStatus: null,
      };
    case actions.CHECK_IN_ERROR:
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
    default:
      return state;
  }
}
