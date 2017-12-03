// @flow
import { connect } from 'react-redux';
import FeedComponent from './components/FeedComponent';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    checkIns: checkIn.checkIns,
    isListingCheckIns: checkIn.isListingCheckIns,
    checkInListErrorStatus: checkIn.checkInListErrorStatus,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedComponent);
