import React, { memo } from 'react';
import PropTypes from 'prop-types';

import AuthForm from '../AuthForm';

import styles from './index.module.scss';

const Authorization = ({
    formSubmitHandler,
    errMessage,
    loading,
    clearErrors,
}) => (
    <div className={styles.authorization}>
        <AuthForm
            errMessage={errMessage}
            formSubmitHandler={formSubmitHandler}
            loading={loading}
            clearErrors={clearErrors}
        />
    </div>
);


Authorization.propTypes = {
    errMessage: PropTypes.string.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    clearErrors: PropTypes.func,
};

Authorization.defaultProps = {
    loading: false,
    clearErrors: Function.prototype,
};

export default memo(Authorization);
