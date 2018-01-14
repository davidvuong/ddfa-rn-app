// @flow
import _ from 'lodash';
import * as actions from '../actions/ActionTypes';

type State = {
  checkIns: Array<*>,
  nearbyCheckIns: Array<*>,
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

  // Nearby check-ins (CheckInNearby, not InfiniteScroll)
  nearbyCheckIns: [],
};

export default function CheckInReducer(state: State = initialState, action: *): State {
  switch (action.type) {
    case actions.LIST_CHECK_INS_SUCCESS:
      return { ...state, checkIns: _.concat(state.checkIns, action.checkIns) };
    case actions.GET_NEARBY_CHECK_INS_SUCCESS:
      return { ...state, nearbyCheckIns: action.checkIns };
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
