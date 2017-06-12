import { connect } from 'react-redux';
import Screen from './components/Screen';

import { getCurrentLocation, getNearby } from '../../actions/GeoLocationActions';

const mapStateToProps = (state) => {
  const { geolocation } = state;
  return {
    isFetchingLocation: geolocation.isFetchingLocation,
    locationFetchErrorStatus: geolocation.locationFetchErrorStatus,
    location: geolocation.location,

    isFetchingNearby: geolocation.isFetchingNearby,
    nearbyFetchErrorStatus: geolocation.nearbyFetchErrorStatus,
    places: geolocation.places,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentLocation: () => {
      return dispatch(getCurrentLocation());
    },
    getNearby: (latitude, longitude, radius) => {
      return dispatch(getNearby(latitude, longitude, radius));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
