// @flow
import { connect } from 'react-redux';

import { setSelectedLocation } from '../../actions/CheckInActions';
import GlobalFooterComponent from './GlobalFooterComponent';
import AuthenticationService from '../../services/Api/AuthenticationService';
import CheckInService from '../../services/Api/CheckInService';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    createCheckIn: CheckInService.create,
    logoutUser: AuthenticationService.logout,
    setSelectedLocation: (selectedLocation: *) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalFooterComponent);
