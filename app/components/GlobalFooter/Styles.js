// TODO: Share these styles with any other pages that uses a footer.

const footerPrimaryColor = 'rgb(63, 81, 181)';

const footerButton = {
  backgroundColor: footerPrimaryColor,
  height: 56,
  maxWidth: 76,
  borderRadius: 0,
  borderTopWidth: 5,
  borderTopColor: footerPrimaryColor,
};

export default {
  footerContainer: {
    height: 56,
    backgroundColor: 'white',
  },
  footerTab: {
    backgroundColor: footerPrimaryColor,
  },
  footerButton,
  footerButtonActive: {
    ...footerButton,
    borderTopColor: 'white',
  },
  footerButtonSpinning: {
    ...footerButton,
    maxWidth: 68,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  checkInButton: {
    ...footerButton,
    alignSelf: 'center',
    maxWidth: 68,
  },
  checkInButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
};
