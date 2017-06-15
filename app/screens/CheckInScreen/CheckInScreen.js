import { connect } from 'react-redux';
import CheckIn from './components/CheckInComponent';

import {
  getCurrentLocation,
  getNearby,
} from '../../actions/GeoLocationActions';
import { checkIn } from '../../actions/CheckInsActions';

const mapStateToProps = (state) => {
  const { geoLocation, checkIns } = state;
  return {
    isFetchingLocation: geoLocation.isFetchingLocation,
    locationFetchErrorStatus: geoLocation.locationFetchErrorStatus,
    currentLocation: geoLocation.currentLocation,

    isFetchingNearby: geoLocation.isFetchingNearby,
    nearbyFetchErrorStatus: geoLocation.nearbyFetchErrorStatus,
    places: geoLocation.places,

    isCheckingIn: checkIns.isCheckingIn,
    checkInErrorStatus: checkIns.checkInErrorStatus,
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
