import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import TestComponent from '../TestComponent';
// import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm';

import styles from './index.module.scss';

const Authorization = ({ formSubmitHandler, errMessage }) => (
    <div className={styles.authorization}>
        <AuthForm
            errMessage={errMessage}
            formSubmitHandler={formSubmitHandler}
        />
    </div>
);


Authorization.propTypes = {
    errMessage: PropTypes.string.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
};

export default memo(Authorization);
