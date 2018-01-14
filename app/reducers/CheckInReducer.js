// @flow
import _ from 'lodash';
import * as actions from '../actions/ActionTypes';

type State = {
  checkIns: Array<*>,
  selectedLocation: *,
  selectedCheckIn: *,
};

const initialState: State = {
  // The location we've selected to check in.
  selectedLocation: null,

  // The selected checkIn to view when in detailed page.
  selectedCheckIn: null,

  // Previously checked in resources (CheckInList, InfiniteScroll)
  checkIns: [],
};

export default function CheckInReducer(state: State = initialState, action: *): State {
  switch (action.type) {
    case actions.CREATE_CHECK_IN_SUCCESS:
      return state;
    case actions.LIST_CHECK_INS_SUCCESS:
      return { ...state, checkIns: _.concat(state.checkIns, action.checkIns) };
    case actions.SET_SELECTED_CHECK_IN:
      return { ...state, selectedCheckIn: action.selectedCheckIn };
    case actions.RESET_SELECTED_CHECK_IN:
      return { ...state, selectedCheckIn: null };
    case actions.RESET_CHECK_IN_LIST:
      return { ...state, checkIns: [] };
    case actions.SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.selectedLocation };
    case actions.RESET_SELECTED_LOCATION:
      return { ...state, selectedLocation: null };
    default:
      return state;
  }
}
