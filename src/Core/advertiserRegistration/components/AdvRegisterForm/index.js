// todo(nn): Добавить ссылки на документы, когда они появятся
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Button, Result, message, Form,
} from 'antd';
import {
    StandardForm,
    FormItemWrapper,
    PasswordValidationRulesPopover,
} from 'Core/ant';
import { useValidationStatus } from 'Core/ant/helpers';
import options from './options';

import styles from './index.module.scss';


const AdvRegisterForm = ({
    registerAdvertiserAction,
    loading,
    isRegisterReqSuccess,
    error,
    cleanErrorAction,
}) => {
    const [form] = Form.useForm();

    const validationObj = {
        patternMinLength: /.{8,}/,
        patternUppSyms: /[A-Z]+/,
        patternLowSyms: /[a-z]+/,
        patternNums: /[0-9]+/,
        patternSpecSymb: /[!"#$%&'()*+,-.:;<=>?@^_`[\]{|}~\\]/,
    };
    const {
        validationStatus,
        setValidationStatus,
        checkPatterns,
    } = useValidationStatus(form, validationObj, 'password');

    const [visible, setVisible] = useState(false);
    const toggleVisibility = (visibility) => {
        setVisible(!visibility);
    };

    const highlightPasswordOnSubmitFailure = () => {
        const isFieldTouched = form.isFieldTouched('password');
        const status = !isFieldTouched ? 'error' : validationStatus;
        return setValidationStatus(status);
    };

    useEffect(() => () => {
        cleanErrorAction();
    }, [cleanErrorAction]);

    useEffect(() => {
        if (!error) return;
        message.error(error, 3);
        cleanErrorAction();
    }, [error, cleanErrorAction]);

    const onSubmit = (values) => {
        const data = values;
        delete data.submit;
        registerAdvertiserAction(data);
    };

    let date = new Date();
    date.setDate(date.getDate() + 1);
    date = date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    return (
        <div className={styles.container}>
            {isRegisterReqSuccess && !error
                ? (
                    <>
                        <Result
                            className={styles.info}
                            title="Перейдите по ссылке в письме на электронной почте для завершения регистрации"
                        />
                        <p className={styles.text}>
                            Ссылка действительна в&nbsp;течении суток, до&nbsp;
                            {date}
                        </p>
                    </>
                )
                : (
                    <>
                        <div className={styles.headlines}>
                            <h1>Регистрация рекламодателя</h1>
                        </div>
                        <StandardForm
                            options={options}
                            onFinish={onSubmit}
                            onFinishFailed={highlightPasswordOnSubmitFailure}
                            outerFormInstance={form}
                        >
                            <FormItemWrapper type="text-input" name="name" />
                            <FormItemWrapper type="text-input" name="surname" />
                            <FormItemWrapper type="text-input" name="organization" />
                            <FormItemWrapper type="text-input" name="email" />
                            <PasswordValidationRulesPopover visible={visible} />
                            <FormItemWrapper
                                type="password-input"
                                name="password"
                                propsToChild={{
                                    onChange: (e) => checkPatterns(e.target.value),
                                    onFocus: () => toggleVisibility(false),
                                    onBlur: () => toggleVisibility(true),
                                }}
                                hasFeedback
                                validateStatus={validationStatus}
                            />
                            <FormItemWrapper
                                shouldUpdate
                                type="custom-component"
                                name="submit"
                                component={(props) => (
                                    <Button
                                        loading={loading}
                                        className={styles.submit}
                                        {...props}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                )}
                            />
                        </StandardForm>
                        <p className={styles.description}>
                            Нажимая на&nbsp;кнопку &laquo;Зарегистрироваться&raquo;, вы&nbsp;
                            соглашаетесь с&nbsp;
                            <a href="/" target="_blank">Политикой конфиденциальности</a>
                            &thinsp;и&nbsp;
                            <a href="/" target="_blank">Обработкой персональных данных</a>
                        </p>
                    </>
                )}
        </div>
    );
};


AdvRegisterForm.defaultProps = {
    loading: false,
    isRegisterReqSuccess: false,
    registerAdvertiserAction: Function.prototype,
    cleanErrorAction: Function.prototype,
    error: null,
};

AdvRegisterForm.propTypes = {
    loading: PropTypes.bool,
    isRegisterReqSuccess: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
    cleanErrorAction: PropTypes.func,
    error: PropTypes.string,
};

export default AdvRegisterForm;
