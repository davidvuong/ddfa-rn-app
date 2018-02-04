// @flow
import { connect } from 'react-redux';

import ReviewCreateComponent from './components/ReviewCreateComponent';
import ReviewService from '../../services/Api/ReviewService';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    selectedLocation: checkIn.selectedLocation,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    createReview: ReviewService.create,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewCreateComponent);
