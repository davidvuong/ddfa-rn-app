import { connect } from 'react-redux';
import CheckIn from './components/CheckInComponent';

import {
  getCurrentLocation,
  getNearby,
} from '../../actions/GeoLocationActions';
import { checkIn } from '../../actions/CheckInActions';

const mapStateToProps = (state) => {
  const { geoLocation, checkIn } = state;
  return {
    isFetchingLocation: geoLocation.isFetchingLocation,
    locationFetchErrorStatus: geoLocation.locationFetchErrorStatus,
    currentLocation: geoLocation.currentLocation,

    isFetchingNearby: geoLocation.isFetchingNearby,
    nearbyFetchErrorStatus: geoLocation.nearbyFetchErrorStatus,
    places: geoLocation.places,

    isCheckingIn: checkIn.isCheckingIn,
    checkInErrorStatus: checkIn.checkInErrorStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => {
      return dispatch(getCurrentLocation());
    },
    getNearby: (latitude, longitude, radius) => {
      return dispatch(getNearby(latitude, longitude, radius));
    },
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
