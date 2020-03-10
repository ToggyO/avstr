import React from 'react';
// import PropTypes from 'prop-types';
// import TestComponent from './TestComponent';

import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';

import styles from './Authorization.module.scss';

const Authorization = () => (
    <div className={styles.authorization}>
        <div className={styles.cover} />

        <Logo />
        <h1 className={styles.title}>Добро пожаловать</h1>
        <h2 className={styles.subtitle}>Пожалуйста, введите свои учетные данные.</h2>
        <AuthForm />
    </div>
);


Authorization.defaultProps = {};

Authorization.propTypes = {};

export default Authorization;
