import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProp } from 'Core/utils/getProp';
import { confirmAdRegistration } from '../action-creators';

import ConfirmPageView from './View';

const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    isConfirmSuccess: getProp(advertiserRegistrationReducer, 'isConfirmSuccess', false),
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
});

const mapDispatchToProps = {
    confirmAdRegistrationAction: confirmAdRegistration,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ConfirmPageView);
