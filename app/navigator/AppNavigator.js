import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import { Navigator } from './Navigator';
import AuthenticationService from '../services/AuthenticationService';

class AppNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: null };
  }

  componentDidMount() {
    AuthenticationService.isLoggedIn().then((isLoggedIn) => {
      this.setState({ isLoggedIn });
    }, (error) => {
      console.error(error);
      this.setState({ isLoggedIn: false });
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    if (_.isNull(isLoggedIn)) {
      return null;
    }

    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppNavigator);
