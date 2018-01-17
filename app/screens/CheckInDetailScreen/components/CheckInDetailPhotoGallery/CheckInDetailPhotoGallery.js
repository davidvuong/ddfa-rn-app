// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Styles from './Styles';

type Props = {
  photos: Array<*>,
  getPhotoUrl: (string) => string,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  render() {
    if (!this.props.photos.length) { return null; }
    return (
      <Swiper loop height={380} activeDotColor="rgba(255, 255, 255, 0.65)">
        {
          _.map(this.props.photos, (photo: *) => {
            const source = { uri: `${this.props.getPhotoUrl(photo.id)}?width=420` };
            return <Image key={photo.id} source={source} style={Styles.photo} />;
          })
        }
      </Swiper>
    );
  }
}
