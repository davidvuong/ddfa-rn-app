// @flow
import * as actions from '../ActionTypes';
import ReviewService from '../services/Api/ReviewService';

/* Internal */

function createReviewRequest() {
  return { type: actions.CREATE_REVIEW_REQUEST };
}

function createReviewSuccess() {
  return { type: actions.CREATE_REVIEW_SUCCESS };
}

function createReviewError(error: Error) {
  return { type: actions.CREATE_REVIEW_ERROR, error };
}

/* External */

export function createReview( // eslint-disable-line import/prefer-default-export
  checkInId: string,
  amountPaid: number,
  currency: string,
  comment: ?string,
  foodRating: ?number,
  environmentRating: ?number,
  serviceRating: ?number,
) {
  return (dispatch: *) => {
    dispatch(createReviewRequest());
    return ReviewService.create(
      checkInId, amountPaid, currency, comment, foodRating, environmentRating, serviceRating,
    )
      .then((id: string) => {
        dispatch(createReviewSuccess());
        return id;
      })
      .catch((error: Error) => {
        dispatch(createReviewError(error));
        throw error;
      });
  };
}
