// @flow
import { connect } from 'react-redux';

import CheckInNearbyComponent from './components/CheckInNearbyComponent';
import GeoLocationService from '../../services/GeoLocationService';
import {
  getNearbyCheckIns,
  setSelectedCheckIn,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  return {
    nearbyCheckIns: state.checkIn.nearbyCheckIns,
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
    getCurrentPosition: GeoLocationService.getCurrentPosition,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInNearbyComponent);
