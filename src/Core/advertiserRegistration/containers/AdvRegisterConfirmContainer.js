import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProp } from 'Core/utils/getProp';
import { confirmAdRegistration, cleanError } from '../action-creators';

import AdvRegisterConfirm from '../components/AdvRegisterConfirm';


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    isConfirmSuccess: getProp(advertiserRegistrationReducer, 'isConfirmSuccess', false),
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
});

const mapDispatchToProps = {
    confirmAdRegistrationAction: confirmAdRegistration,
    cleanErrorAction: cleanError,
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(AdvRegisterConfirm);
