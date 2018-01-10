// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Card,
} from 'native-base';
import {
  Image,
  ScrollView,
} from 'react-native';

import Styles from './Styles';

type Props = {
  checkIn: *,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  renderPhotos() {
    const { photos } = this.props.checkIn;
    if (!photos || photos.length === 0) { return null; }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        {
          _.map(photos, (photo: *, i: number) => {
            const source = { uri: `http://localhost:5000/photos/${photo.id}` };
            return <Image key={i} source={source} style={Styles.photo} />;
          })
        }
      </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        {this.renderPhotos()}
      </Container>
    );
  }
}
