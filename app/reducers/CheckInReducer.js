import * as actions from '../ActionTypes';

const initialState = {
  isCheckingIn: null,
  checkInErrorStatus: null,
  selectedLocation: null,
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
      selectedLocationTmp: null,
    };
  case actions.CHECK_IN_ERROR:
    return { ...state, isCheckingIn: false, checkInErrorStatus: action.error };
  case actions.SET_SELECTED_LOCATION:
    return { ...state, selectedLocation: action.selectedLocation };
  default:
    return state;
  }
}
