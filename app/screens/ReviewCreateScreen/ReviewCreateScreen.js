// @flow
import { connect } from 'react-redux';
import ReviewCreateComponent from './components/ReviewCreateComponent';

import {
  listCheckIns,
  resetSelectedLocation,
  resetCheckIns,
} from '../../actions/CheckInActions';
import {
  createReview,
} from '../../actions/ReviewActions';

const mapStateToProps = (state: *) => {
  const { checkIn, review } = state;
  return {
    selectedLocation: checkIn.selectedLocation,
    isCreatingReview: review.isCreatingReview,
    createReviewErrorStatus: review.createReviewErrorStatus,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    resetSelectedLocation: () => {
      return dispatch(resetSelectedLocation());
    },
    resetCheckIns: () => {
      return dispatch(resetCheckIns());
    },
    listCheckIns: (startTime: string) => {
      return dispatch(listCheckIns(startTime));
    },
    createReview: (
      checkInId: string,
      amountPaid: number,
      currency: string,
      comment: ?string,
      foodRating: ?number,
      environmentRating: ?number,
      serviceRating: ?number,
    ) => {
      return dispatch(createReview(
        checkInId,
        amountPaid,
        currency,
        comment,
        foodRating,
        environmentRating,
        serviceRating,
      ));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewCreateComponent);
