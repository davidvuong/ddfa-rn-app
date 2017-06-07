import * as actions from '../actions/ActionTypes';
import { request, success, error } from '../actions/GenericRequestActions';

const initialState = {
  status: {},
  checkIns: [],
};

export default function CheckInsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CHECK_INS_REQUEST:
      return { ...state, status: request() };
    case actions.GET_CHECK_INS_SUCCESS:
      return { ...state, checkIns: action.checkIns, status: success() };
    case actions.GET_CHECK_INS_ERROR:
      return { ...state, status: error() };
    default:
      return state;
  }
}
