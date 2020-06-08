import React from 'react';
import PropTypes from 'prop-types';

import { SUCCESS_RESULT_TYPES } from 'Core/accessRecovery/constants';
import ChangePasswordSuccess from './ChangePasswordSuccess';
import RecoverySuccess from './RecoverySuccess';

const Success = ({ resultType, ...rest }) => {
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
    resultType: PropTypes.oneOf([
        'RecoverySuccess',
        'ChangePasswordSuccess',
    ]).isRequired,
};

export default Success;
