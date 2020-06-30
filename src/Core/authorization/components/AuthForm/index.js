// todo(nn): При переделке стр не забыть перенести айдишники для автотестов
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import Logo from 'Core/common/Logo';
import Input from 'Core/common/Input';
import Checkbox from 'Core/common/Checkbox';
// import Button from 'Core/common/Button';
import ErrMessage from 'Core/common/ErrorMessage';


import styles from './index.module.scss';


const AuthForm = ({
    formSubmitHandler,
    errMessage,
    clearErrors,
    loading,
}) => {
    const [loginText, setLoginText] = useState('');

    const [passwordText, setPasswordText] = useState('');
    const [showPassword, toggleShowPassword] = useState(false);
    const passwordRef = useRef(null);

    const [checkboxValue, setCheckboxValue] = useState(false);
    // const [showInputErrors, setShowInputErrors] = useState(false);

    useEffect(() => () => clearErrors(), [clearErrors]);

    const handleLoginChange = ({ target: { value } }) => {
        setLoginText(value);
        // setShowInputErrors(false);
    };

    const handlePasswordChange = ({ target: { value } }) => {
        setPasswordText(value);
        // setShowInputErrors(false);
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
            username: loginText,
            password: passwordText,
            rememberLogin: checkboxValue,
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
            <div className={styles.wrap}>
                <Logo className={styles.logo} />
                <h1 className={styles.title}>Добро пожаловать</h1>
                <h2 className={styles.subtitle}>Пожалуйста, введите свои учетные данные</h2>
                <Input
                    className={styles.input}
                    placeholder="Электронная почта"
                    value={loginText}
                    onChange={handleLoginChange}
                    error={errMessage !== ''}
                    id="emailAuth" // Для автотестов
                />
                <div className={styles.passwordWrap}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        icons={passwordIcon}
                        className={styles.input}
                        placeholder="Пароль"
                        value={passwordText}
                        error={errMessage !== ''}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        ref={passwordRef}
                        id="passwordAuth" // Для автотестов
                    />
                    {errMessage !== '' && (
                        <ErrMessage
                            text={errMessage}
                            className={styles.err}
                        />
                    )}
                </div>

                <div className={styles.serviceWrap}>
                    <Checkbox
                        className={styles.checkbox}
                        label="Оставаться в системе"
                        checked={checkboxValue}
                        onChange={handleCheckboxValue}
                    />

                    <Link to="/recovery">Забыли пароль?</Link>
                </div>

                <div className={styles.btnWrap}>
                    <Button
                        disabled={!loginText || !passwordText}
                        type="primary"
                        size="large"
                        htmlType="button"
                        loading={loading}
                        className={styles.btn}
                        onClick={handleBtnClick}
                        id="signIn" // Для автотестов
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </form>
    );
};


AuthForm.propTypes = {
    errMessage: PropTypes.string.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    clearErrors: PropTypes.func,
};

AuthForm.defaultProps = {
    loading: false,
    clearErrors: Function.prototype,
};

export default AuthForm;
