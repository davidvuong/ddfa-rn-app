import * as actions from '../ActionTypes';

const initialState = {
  isFetchingLocation: null,
  locationFetchErrorStatus: null,
  location: null,

  isFetchingNearby: null,
  nearbyFetchErrorStatus: null,
  places: null,
};

export default function GeoLocationReducer(state = initialState, action) {
  switch (action.type) {

  /* getCurrentLocation */
  case actions.GET_CURRENT_LOCATION_REQUEST:
    return { ...state, isFetchingLocation: true, locationFetchErrorStatus: null };
  case actions.GET_CURRENT_LOCATION_SUCCESS:
    return {
      ...state,
      isFetchingLocation: false,
      locationFetchErrorStatus: null,
      location: action.location,
    };
  case actions.GET_CURRENT_LOCATION_ERROR:
    return { ...state, isFetchingLocation: false, locationFetchErrorStatus: action.error };

  /* getNearby */
  case actions.GET_NEARBY_REQUEST:
    return { ...state, isFetchingNearby: true, nearbyFetchErrorStatus: null };
  case actions.GET_NEARBY_SUCCESS:
    return {
      ...state,
      isFetchingNearby: false,
      nearbyFetchErrorStatus: null,
      places: action.places,
    };
  case actions.GET_NEARBY_ERROR:
    return { ...state, isFetchingNearby: false, nearbyFetchErrorStatus: action.error };

  default:
    return state;
  }
}
