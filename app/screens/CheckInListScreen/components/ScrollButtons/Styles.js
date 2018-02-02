// @flow

const commonArrowStyles = {
  width: 36,
  height: 36,
  left: -7,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export default {
  upArrow: { ...commonArrowStyles, bottom: 40 },
  downArrow: { ...commonArrowStyles, bottom: 0 },
  arrowIcons: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
};
