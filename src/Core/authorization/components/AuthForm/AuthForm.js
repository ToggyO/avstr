import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { Input, Button } from 'semantic-ui-react';
import Checkbox from '../../../common/Checkbox/Checkbox';

import styles from './AuthForm.module.scss';


const AuthForm = () => {
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

    console.log(loginText, passwordText, checkboxValue);
    return (
        <form className={styles.authForm}>
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
            <Checkbox
                className={styles.checkbox}
                label="Оставаться в системе"
                checked={checkboxValue}
                onChange={handleCheckboxValue}
            />
            <Button
                className={styles.btn}
                // onClick={}
            >
                Войти
            </Button>
        </form>
    );
};


AuthForm.propTypes = {};

export default AuthForm;