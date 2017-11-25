import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

const propTypes = {};

export default class ActionText extends Component {
  constructor(props) {
    super(props);

    this.onUploadFromCamera = this.onUploadFromCamera.bind(this);
    this.onUploadFromPhotos = this.onUploadFromPhotos.bind(this);
  }

  onUploadFromCamera() {

  }

  onUploadFromPhotos() {
    Permissions.requestPermission('photo').then((permission) => {
      console.log(permission);

      const options = {
        title: 'Upload images to this check-in',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else {
          let source = { uri: response.uri };

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          console.log(source);
        }
      });
    });
  }

  render() {
    return (
      <View styleName="horizontal h-center space-between">
        <Text onPress={this.onUploadFromPhotos}>Photos</Text>
        <Text onPress={this.onUploadFromCamera}>Camera</Text>
        <Text>Rating</Text>
        <Text>Price</Text>
      </View>
    );
  }
}

ActionText.propTypes = propTypes;
