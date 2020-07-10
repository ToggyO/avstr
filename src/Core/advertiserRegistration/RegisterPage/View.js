import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { isEmptyObject } from 'Core/utils/isEmpty';
import RegistrationForm from './components/RegistrationForm';
import InfoMessage from './components/InfoMessage';

const RegisterPageView = ({
    registerAdvertiserAction,
    loading,
    isRegisterReqSuccess,
    errorsFromBackend,
    cleanErrorAction,
    setDefaultStateAction,
}) => {
    useEffect(() => () => cleanErrorAction(), [cleanErrorAction]);

    return (
        isRegisterReqSuccess && isEmptyObject(errorsFromBackend)
            ? <InfoMessage setDefaultStateAction={setDefaultStateAction} />
            : (
                <RegistrationForm
                    registerAdvertiserAction={registerAdvertiserAction}
                    loading={loading}
                    errorsFromBackend={errorsFromBackend}
                />
            )
    );
};

RegisterPageView.defaultProps = {
    loading: false,
    isRegisterReqSuccess: false,
    registerAdvertiserAction: Function.prototype,
    cleanErrorAction: Function.prototype,
    setDefaultStateAction: Function.prototype,
    errorsFromBackend: {},
};

RegisterPageView.propTypes = {
    loading: PropTypes.bool,
    isRegisterReqSuccess: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
    cleanErrorAction: PropTypes.func,
    setDefaultStateAction: PropTypes.func,
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
};

export default RegisterPageView;
