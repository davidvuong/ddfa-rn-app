import { connect } from 'react-redux';

import {
  setSelectedLocation,
  setSelectedLocationTmp,
} from '../../actions/CheckInActions';

import SetLocationComponent from './components/SetLocationComponent';

const mapStateToProps = (state) => {
  const { geoLocation, checkIn } = state;
  return {
    places: geoLocation.places,
    currentLocation: geoLocation.currentLocation,

    selectedLocation: checkIn.selectedLocation,
    selectedLocationTmp: checkIn.selectedLocationTmp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedLocation: (location) => {
      dispatch(setSelectedLocation(location));
    },
    setSelectedLocationTmp: (location) => {
      dispatch(setSelectedLocationTmp(location));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetLocationComponent);
