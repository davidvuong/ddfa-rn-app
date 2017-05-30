import React, { Component } from 'react';

import { Examples } from '@shoutem/ui'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Examples />
    );
  }
}
