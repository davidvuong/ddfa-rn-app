// @flow
import { connect } from 'react-redux';

import CheckInNearbyComponent from './components/CheckInNearbyComponent';
import {
  getNearbyCheckIns,
  setSelectedCheckIn,
  setSelectedLocation,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    position: checkIn.selectedLocation, // TODO: Don't share this action with CreateReview.
    nearbyCheckIns: checkIn.nearbyCheckIns,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    getNearbyCheckIns: (latitude: number, longitude: number) => {
      return dispatch(getNearbyCheckIns(latitude, longitude));
    },
    setSelectedCheckIn: (checkIn: *) => {
      return dispatch(setSelectedCheckIn(checkIn));
    },
    setSelectedLocation: (location: *) => {
      return dispatch(setSelectedLocation(location));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInNearbyComponent);
