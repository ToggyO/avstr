import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';

import { cleanError, registerAdvertiser } from '../action-creators';

import AdvRegisterForm from '../components/AdvRegisterForm';


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
    isRegisterReqSuccess: getProp(advertiserRegistrationReducer, 'isRegisterReqSuccess', false),
    error: getProp(advertiserRegistrationReducer, 'error', null),
});

const mapDispatchToProps = {
    registerAdvertiserAction: registerAdvertiser,
    cleanErrorAction: cleanError,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvRegisterForm);