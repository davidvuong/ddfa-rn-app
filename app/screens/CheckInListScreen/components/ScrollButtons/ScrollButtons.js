// @flow
import * as React from 'react';
import {
  View,
  Icon,
  Fab,
} from 'native-base';

import Styles from './Styles';

type Props = {
  container?: ?{
    scrollToPosition: (number) => void,
    scrollToEnd: () => void,
    position: { x: number, y: number },
  },
};

type State = {};

export default class CheckInListComponent extends React.Component<Props, State> {
  onPressScrollUpFab = () => {
    if (this.props.container) {
      this.props.container.scrollToPosition(0);
    }
  }

  onPressScrollDownFab = () => {
    if (this.props.container) {
      this.props.container.scrollToEnd();
    }
  }

  render() {
    if (!this.props.container) { return null; }
    return (
      <View>
        <Fab
          onPress={this.onPressScrollUpFab}
          position="bottomRight"
          style={Styles.upArrow}
        >
            <Icon name="ios-arrow-up" style={Styles.arrowIcons} />
        </Fab>
        <Fab
          onPress={this.onPressScrollDownFab}
          position="bottomRight"
          style={Styles.downArrow}
        >
            <Icon name="ios-arrow-down" style={Styles.arrowIcons} />
        </Fab>
      </View>
    );
  }
}
