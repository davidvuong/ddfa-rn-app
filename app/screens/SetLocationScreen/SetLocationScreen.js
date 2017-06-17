import { connect } from 'react-redux';

import {
  setSelectedLocation,
} from '../../actions/CheckInActions';

import SetLocationComponent from './components/SetLocationComponent';

const mapStateToProps = (state) => {
  const { geoLocation } = state;
  return {
    places: geoLocation.places,
    currentLocation: geoLocation.currentLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedLocation: (location) => {
      dispatch(setSelectedLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetLocationComponent);
