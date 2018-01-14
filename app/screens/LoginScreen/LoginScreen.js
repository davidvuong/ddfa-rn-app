// @flow
import { connect } from 'react-redux';

import LoginComponent from './components/LoginComponent';
import AuthenticationService from '../../services/Api/AuthenticationService';

const mapStateToProps = (state: *) => {
  return {};
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    loginUser: AuthenticationService.login,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
