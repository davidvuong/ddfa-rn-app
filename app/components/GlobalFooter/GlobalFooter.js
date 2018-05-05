import { connect } from 'react-redux';

import {
  setSelectedLocation,
  resetCheckIns,
  listCheckIns,
} from '../../actions/CheckInActions';
import GlobalFooterComponent from './GlobalFooterComponent';
import AuthenticationService from '../../services/Api/AuthenticationService';
import CheckInService from '../../services/Api/CheckInService';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCheckIn: CheckInService.create,
    logoutUser: AuthenticationService.logout,
    setSelectedLocation: (selectedLocation) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
    resetCheckIns: () => {
      return dispatch(resetCheckIns());
    },
    listCheckIns: (startTime) => {
      return dispatch(listCheckIns(startTime));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalFooterComponent);
