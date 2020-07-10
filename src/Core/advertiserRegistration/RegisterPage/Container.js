import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';

import { cleanError, registerAdvertiser, setDefaultState } from '../action-creators';

import RegisterPageView from './View';

const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
    isRegisterReqSuccess: getProp(advertiserRegistrationReducer, 'isRegisterReqSuccess', false),
    errorsFromBackend: getProp(advertiserRegistrationReducer, 'errors'),
});

const mapDispatchToProps = {
    registerAdvertiserAction: registerAdvertiser,
    cleanErrorAction: cleanError,
    setDefaultStateAction: setDefaultState,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageView);
