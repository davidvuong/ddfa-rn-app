// @flow
import { connect } from 'react-redux';

import LoginComponent from './components/LoginComponent';
import AuthenticationService from '../../services/Api/AuthenticationService';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {
    loginUser: AuthenticationService.login,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
