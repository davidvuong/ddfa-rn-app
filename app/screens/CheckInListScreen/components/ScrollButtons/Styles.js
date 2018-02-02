// @flow

const commonArrowStyles = {
  width: 36,
  height: 36,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  shadowColor: null,
  shadowOffset: null,
  shadowOpacity: null,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.15)',
};

export default {
  upArrow: { ...commonArrowStyles, bottom: 40 },
  downArrow: { ...commonArrowStyles, bottom: 0 },
  arrowIcons: {
    fontSize: 16,
    color: 'black',
  },
};
