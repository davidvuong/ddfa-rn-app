// @flow
import { connect } from 'react-redux';

import CacheService from '../../services/CacheService';
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
    getCachedReview: (checkInId: string): Promise<?Object> => {
      return CacheService.get(`checkIn:${checkInId}`);
    },
    setCachedReview: (checkInId: string, value: Object): Promise<void> => {
      return CacheService.set(`checkIn:${checkInId}`, value);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewCreateComponent);
