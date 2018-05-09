import * as React from 'react';

import {
  Header,
  Left,
  Body,
  Right,
  Text,
  Button,
  Icon,
} from 'native-base';

import Styles from './Styles';

const ReviewCreateHeader = ({ isWritingComment, onPressLeft, onPressRight }) => {
  if (isWritingComment) {
    return (
      <Header>
        <Left />
        <Body />
        <Right>
          <Button transparent onPress={onPressRight}>
            <Text style={Styles.headerText}>Done</Text>
          </Button>
        </Right>
      </Header>
    );
  }
  return (
    <Header>
      <Left>
        <Button transparent onPress={onPressLeft}>
          <Icon name="arrow-back" style={Styles.headerBackIcon} />
        </Button>
      </Left>
      <Body>
        <Text style={Styles.headerText}>DDFA Review</Text>
      </Body>
      <Right />
    </Header>
  );
};

export default ReviewCreateHeader;
