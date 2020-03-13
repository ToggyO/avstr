import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Input, Button } from 'semantic-ui-react';
import Checkbox from '../../../common/Checkbox/Checkbox';

import styles from './AuthForm.module.scss';


const AuthForm = ({ formSubmitHandler, errMessage }) => {
    const [loginText, setLoginText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);

    const handleLoginChange = ({ target: { value } }) => {
        setLoginText(value);
    };

    const handlePasswordChange = ({ target: { value } }) => {
        setPasswordText(value);
    };

    const handleCheckboxValue = ({ target: { checked } }) => {
        setCheckboxValue(checked);
    };

    const handleBtnClick = (e) => {
        e.preventDefault();

        /* Username: 'avastar-test@smarthead.ru',
        Password: 'Qwe123!',
        ReturnUrl,
        RememberLogin: true, */

        formSubmitHandler({
            Username: loginText,
            Password: passwordText,
            RememberLogin: checkboxValue,
        });
    };

    return (
        <form className={styles.authForm}>
            {/* <Logo /> */}
            <h1 className={styles.title}>Добро пожаловать</h1>
            <h2 className={styles.subtitle}>Пожалуйста, введите свои учетные данные</h2>
            <Input
                className={styles.input}
                placeholder="Введите логин"
                value={loginText}
                onChange={handleLoginChange}
            />
            <Input
                className={styles.input}
                placeholder="Введите пароль"
                value={passwordText}
                onChange={handlePasswordChange}
            />
            {errMessage !== '' && <span className={styles.err}>{errMessage}</span>}

            <div className={styles.btnWrap}>
                <Checkbox
                    className={styles.checkbox}
                    label="Оставаться в системе"
                    checked={checkboxValue}
                    onChange={handleCheckboxValue}
                />
                <Button
                    className={styles.btn}
                    onClick={handleBtnClick}
                >
                    Войти
                </Button>
            </div>
        </form>
    );
};


AuthForm.propTypes = {
    errMessage: PropTypes.string.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
};

export default AuthForm;
