// todo(nn): Добавить ссылки на документы, когда они появятся

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';

import { StandardForm } from 'Core/ant/components/FormComponents/ContextForm';
import { FormItemWrapper, PasswordValidationRulesPopover } from 'Core/ant/components';
import { useValidationStatus } from 'Core/ant/helpers';
import options from '../../options';
import styles from './index.module.scss';

const RegistrationForm = ({
    registerAdvertiserAction,
    loading,
    errorsFromBackend,
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

    const onSubmit = (values) => {
        const data = values;
        delete data.submit;
        registerAdvertiserAction(data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headlines}>
                <h1>Регистрация рекламодателя</h1>
            </div>
            <StandardForm
                options={options}
                onFinish={onSubmit}
                onFinishFailed={highlightPasswordOnSubmitFailure}
                outerFormInstance={form}
                errorsFromBackend={errorsFromBackend}
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
        </div>
    );
};

RegistrationForm.defaultProps = {
    loading: false,
    registerAdvertiserAction: Function.prototype,
    errorsFromBackend: {},
};

RegistrationForm.propTypes = {
    loading: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
};

export default RegistrationForm;
