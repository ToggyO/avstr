import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { restorePasswordRequest, recoveryClearErrors } from 'Core/accessRecovery/action-creators';
import { getProp } from 'Core/utils/getProp';
import ChangePasswordFormView from './ChangePasswordFormView';

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
});

const mapDispatchToProps = {
    clearErrors: recoveryClearErrors,
    restorePassword: restorePasswordRequest,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ChangePasswordFormView);
