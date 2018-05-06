// TODO: Share these styles with any other pages that uses a footer.

const footerButton = {
  backgroundColor: 'rgb(63, 81, 181)',
  height: 56,
  maxWidth: 76,
  borderRadius: 0,
  borderTopWidth: 5,
  borderTopColor: 'rgb(63, 81, 181)',
};

export default {
  footerContainer: {
    height: 56,
    backgroundColor: 'white',
  },
  footerTab: {
    backgroundColor: 'rgb(63, 81, 181)',
  },
  footerButton,
  footerButtonActive: {
    ...footerButton,
    borderTopColor: 'white',
  },
  checkInButton: {
    ...footerButton,
    alignSelf: 'center',
    maxWidth: 72,
  },
  checkInButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
};
