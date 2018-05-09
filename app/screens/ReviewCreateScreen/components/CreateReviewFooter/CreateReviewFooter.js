import * as React from 'react';

import {
  Footer,
  FooterTab,
  Text,
  Button,
} from 'native-base';

import Styles from './Styles';

const CreateReviewFooter = ({ onPress, status }) => {
  const getButtonText = () => {
    switch (status) {
      case 'IDLE':
        return 'Submit';
      case 'CREATING':
        return 'Submitting...';
      case 'CREATED':
        return 'Success 🎉!';
      case 'ERROR':
        return 'Failed :(';
      default:
        return 'Submit';
    }
  };

  return (
    <Footer style={Styles.container}>
      <FooterTab style={Styles.footerTab}>
        <Button onPress={onPress}>
          <Text style={Styles.footerText}>{getButtonText()}</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default CreateReviewFooter;
