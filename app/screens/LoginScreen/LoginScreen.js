// @flow
import { connect } from 'react-redux';

import { loginUser } from '../../actions/AuthenticationActions';
import LoginComponent from './components/LoginComponent';

const mapStateToProps = (state: *) => {
  const { authentication } = state;
  return {
    isLoggingIn: authentication.isLoggingIn,
    loginErrorStatus: authentication.loginErrorStatus,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    loginUser: (username: string, password: string) => {
      return dispatch(loginUser(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
