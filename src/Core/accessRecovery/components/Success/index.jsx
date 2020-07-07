import React from 'react';
import PropTypes from 'prop-types';

import { SUCCESS_RESULT_TYPES } from 'Core/accessRecovery/constants';
import ChangePasswordSuccess from './ChangePasswordSuccess';
import RecoverySuccess from './RecoverySuccess';

const Success = ({ location }) => {
    const { state = {} } = location;
    const { resultType, ...rest } = state;

    const renderResult = (type) => {
        switch (type) {
            case SUCCESS_RESULT_TYPES.RECOVERY:
                return <RecoverySuccess {...rest} />;
            case SUCCESS_RESULT_TYPES.RESTORE_PASSWORD:
                return <ChangePasswordSuccess />;
            default:
                return <h2>Операция успешно выполнена</h2>;
        }
    };

    return (
        <>{renderResult(resultType)}</>
    );
};

Success.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};

export default Success;
