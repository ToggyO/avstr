import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Logo from 'Core/common/Logo';
import Input from 'Core/common/Input';
import Checkbox from 'Core/common/Checkbox';
import Button from 'Core/common/Button';


import styles from './index.module.scss';


const AuthForm = ({ formSubmitHandler, errMessage }) => {
    const [loginText, setLoginText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [showPassword, toggleShowPassword] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const passwordRef = useRef(null);


    const handleLoginChange = ({ target: { value } }) => {
        setLoginText(value);
    };

    const handlePasswordChange = ({ target: { value } }) => {
        setPasswordText(value);
    };
    const handlePasswordFocus = () => {
        const { current } = passwordRef;
        setTimeout(() => {
            current.selectionStart = passwordText.length;
            current.selectionEnd = passwordText.length;
        });
    };
    const handlePasswordIconClick = () => {
        toggleShowPassword(!showPassword);
        const { current } = passwordRef;
        current.focus();
    };

    const handleCheckboxValue = ({ target: { checked } }) => {
        setCheckboxValue(checked);
    };

    const handleBtnClick = (e) => {
        e.preventDefault();
        formSubmitHandler({
            Username: loginText,
            Password: passwordText,
            RememberLogin: checkboxValue,
        });
    };

    const passwordIcon = [
        {
            name: showPassword ? 'eyeHide' : 'eye',
            handler: handlePasswordIconClick,
        },
    ];

    return (
        <form className={styles.authForm}>
            <Logo className={styles.logo} />
            <h1 className={styles.title}>Добро пожаловать</h1>
            <h2 className={styles.subtitle}>Пожалуйста, введите свои учетные данные</h2>
            <Input
                className={styles.input}
                placeholder="Электронная почта"
                value={loginText}
                onChange={handleLoginChange}
            />
            <div className={styles.passwordWrap}>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    icons={passwordIcon}
                    className={styles.input}
                    placeholder="Пароль"
                    value={passwordText}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    ref={passwordRef}
                />
                {errMessage !== '' && <span className={styles.err}>{errMessage}</span>}
            </div>

            <div className={styles.btnWrap}>
                <Checkbox
                    className={styles.checkbox}
                    label="Оставаться в системе"
                    checked={checkboxValue}
                    onChange={handleCheckboxValue}
                />
                <Button
                    disabled={!loginText || !passwordText}
                    type="main"
                    size="medium"
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
