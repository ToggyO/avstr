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
}) => {
    useEffect(() => () => cleanErrorAction(), [cleanErrorAction]);

    return (
        isRegisterReqSuccess && isEmptyObject(errorsFromBackend)
            ? <InfoMessage />
            : (
                <RegistrationForm
                    registerAdvertiserAction={registerAdvertiserAction}
                    loading={loading}
                    isRegisterReqSuccess={isRegisterReqSuccess}
                    errorsFromBackend={errorsFromBackend}
                    cleanErrorAction={cleanErrorAction}
                />
            )
    );
};

RegisterPageView.defaultProps = {
    loading: false,
    isRegisterReqSuccess: false,
    registerAdvertiserAction: Function.prototype,
    cleanErrorAction: Function.prototype,
    errorsFromBackend: {},
};

RegisterPageView.propTypes = {
    loading: PropTypes.bool,
    isRegisterReqSuccess: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
    cleanErrorAction: PropTypes.func,
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
};

export default RegisterPageView;
