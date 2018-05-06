// TODO: Share these styles with any other pages that uses a footer.

const footerButton = {
  backgroundColor: 'white',
  height: 48,
  maxWidth: 76,
  borderRadius: 0,
  borderTopWidth: 5,
  borderTopColor: 'white',
};

export default {
  footerContainer: {
    height: 48,
    backgroundColor: 'white',
  },
  footerTab: {
    backgroundColor: 'white',
  },
  footerButton,
  footerButtonActive: {
    ...footerButton,
    borderTopColor: 'rgba(63, 81, 181, 0.7)',
  },
  checkInButton: {
    ...footerButton,
    alignSelf: 'center',
    maxWidth: 72,
  },
  checkInButtonIcon: {
    color: 'rgb(63, 81, 181)',
    fontSize: 30,
  },
  buttonText: {
    fontSize: 10,
    color: 'black',
  },
};
