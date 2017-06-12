import * as actions from '../ActionTypes';

import GeoLocationService from '../services/GeoLocationService';
import GoogleMapsService from '../services/GoogleMapsService';

/* Internal */

function getCurrentLocationRequest() {
  return { type: actions.GET_CURRENT_LOCATION_REQUEST };
}

function getCurrentLocationSuccess(location) {
  return { type: actions.GET_CURRENT_LOCATION_SUCCESS, location };
}

function getCurrentLocationError(error) {
  return { type: actions.GET_CURRENT_LOCATION_ERROR, error };
}

function getNearbyRequest() {
  return { type: actions.GET_NEARBY_REQUEST };
}

function getNearbySuccess(places) {
  return { type: actions.GET_NEARBY_SUCCESS, places };
}

function getNearbyError(error) {
  return { type: actions.GET_NEARBY_ERROR, error};
}

/* External */

export function getCurrentLocation() {
  return (dispatch) => {
    dispatch(getCurrentLocationRequest());

    return GeoLocationService.promptLocationAccess().then(() => {
      return GeoLocationService.getCurrentLocation();
    }).then((position) => {
      return Promise.all([
        GoogleMapsService.reverseGeocode(
          position.latitude,
          position.longitude
        ),
        position,
      ]);
    }).spread((location, position) => {
      const { latitudeDelta, longitudeDelta } = position;
      dispatch(getCurrentLocationSuccess({ ...location, latitudeDelta, longitudeDelta }));
    }, (error) => {
      dispatch(getCurrentLocationError(error));
    });
  };
}

export function getNearby(latitude, longitude, radius) {
  return (dispatch) => {
    dispatch(getNearbyRequest());
    return GoogleMapsService.getNearby(latitude, longitude, radius).then((places) => {
      dispatch(getNearbySuccess(places));
    }, (error) => {
      dispatch(getNearbyError(error));
    });
  };
}
