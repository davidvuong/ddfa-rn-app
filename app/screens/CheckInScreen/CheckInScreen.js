import { connect } from 'react-redux';
import CheckIn from './components/CheckInComponent';

import {
  checkIn,
} from '../../actions/CheckInActions';

const mapStateToProps = (state) => {
  const { checkIn } = state;
  return {
    selectedLocation: checkIn.selectedLocation,
    isCheckingIn: checkIn.isCheckingIn,
    checkInErrorStatus: checkIn.checkInErrorStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: (latitude, longitude, address, name, comment, rating, isPaying, amountPaid) => {
      return dispatch(checkIn(
        latitude,
        longitude,
        address,
        name,
        comment,
        rating,
        isPaying,
        amountPaid
      ));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckIn);
