// @flow
import { connect } from 'react-redux';
import {
  setSelectedLocation,
  createCheckIn,
} from '../../actions/CheckInActions';
import {
  logoutUser,
} from '../../actions/AuthenticationActions';
import GlobalFooterComponent from './GlobalFooterComponent';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    isCheckingIn: checkIn.isCheckingIn,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    createCheckIn: (latitude: number, longitude: number, address: string, name: string) => {
      return dispatch(createCheckIn(latitude, longitude, address, name));
    },
    logoutUser: () => {
      return dispatch(logoutUser());
    },
    setSelectedLocation: (selectedLocation: *) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalFooterComponent);
