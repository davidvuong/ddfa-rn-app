// @flow
import { connect } from 'react-redux';
import CheckInDetailComponent from './components/CheckInDetailComponent';

import {
  resetSelectedCheckIn,
} from '../../actions/CheckInActions';

const mapStateToProps = (state: *) => {
  const { checkIn } = state;
  return {
    checkIn: checkIn.selectedCheckIn,
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    resetSelectedCheckIn: () => {
      return dispatch(resetSelectedCheckIn());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInDetailComponent);
