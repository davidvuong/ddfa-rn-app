import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import { TabNavigator, StackNavigator } from './Navigators';
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

    const { tabNavigation, stackNavigation } = this.props;
    const AppWithNavigationState = isLoggedIn ? TabNavigator : StackNavigator;
    return (
      <AppWithNavigationState navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: isLoggedIn ? tabNavigation : stackNavigation,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  tabNavigation: state.tabNavigation,
  stackNavigation: state.stackNavigation,
});

export default connect(mapStateToProps)(AppNavigator);
