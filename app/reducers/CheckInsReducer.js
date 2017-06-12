import * as actions from '../ActionTypes';

const initialState = {
  isCheckingIn: null,
  checkInErrorStatus: null,
};

export default function CheckInsReducer(state = initialState, action) {
  switch (action.type) {
  case actions.CHECK_IN_REQUEST:
    return { ...state, isCheckingIn: true, checkInErrorStatus: null };
  case actions.CHECK_IN_SUCCESS:
    return { ...state, isCheckingIn: false, checkInErrorStatus: null };
  case actions.CHECK_IN_ERROR:
    return { ...state, isCheckingIn: false, checkInErrorStatus: action.error, };
  default:
    return state;
  }
}
