// @flow
import * as actions from '../ActionTypes';

type State = {
  isCreatingReview: boolean,
  createReviewErrorStatus: ?Error,
};

const initialState: State = {
  isCreatingReview: false,
  createReviewErrorStatus: null,
};

export default function ReviewReducer(state: State = initialState, action: *): State {
  switch (action.type) {
    case actions.CREATE_REVIEW_REQUEST:
      return { ...state, isCreatingReview: true, createReviewErrorStatus: null };
    case actions.CREATE_REVIEW_SUCCESS:
      return { ...state, isCreatingReview: false, createReviewErrorStatus: null };
    case actions.CREATE_REVIEW_ERROR:
      return { ...state, isCreatingReview: false, createReviewErrorStatus: action.error };
    default:
      return state;
  }
}
