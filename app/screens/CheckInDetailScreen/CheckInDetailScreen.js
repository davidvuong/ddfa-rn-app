import { connect } from 'react-redux';

import CheckInDetailComponent from './components/CheckInDetailComponent';
import CheckInService from '../../services/Api/CheckInService';
import PhotoService from '../../services/Api/PhotoService';
import ReviewService from '../../services/Api/ReviewService';

import {
  resetSelectedCheckIn,
  setSelectedLocation,
} from '../../actions/CheckInActions';

const mapStateToProps = (state) => {
  const { checkIn } = state;
  return {
    checkIn: checkIn.selectedCheckIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSelectedCheckIn: () => {
      return dispatch(resetSelectedCheckIn());
    },
    setSelectedLocation: (selectedLocation) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
    getCheckIn: CheckInService.get,
    getPhotoUrl: PhotoService.getUrl,
    getCurrencySymbol: ReviewService.getCurrencySymbol,
    deleteCheckIn: CheckInService.delete,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInDetailComponent);
