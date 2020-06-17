import { connect } from 'react-redux';

import { forgotPasswordRequest, recoveryClearErrors } from 'Core/accessRecovery/action-creators';
import { getProp } from 'Core/utils/getProp';
import RecoveryFormView from './RecoveryFormView';

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading'),
});

const mapDispatchToProps = {
    clearErrors: recoveryClearErrors,
    sendLink: forgotPasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryFormView);
