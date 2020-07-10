// todo(nn): Добавить ссылки на документы, когда они появятся
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';

import { SPECIAL_BREAKPOINT_FOR_PASSWORD_POPOVER } from 'Core/constants';
import { StandardForm } from 'Core/ant/components/FormComponents/ContextForm';
import trimFormValues from 'Core/utils/trimFormValues';
import { FormItemWrapper, PasswordValidationRulesPopover } from 'Core/ant/components';
import { useValidationStatus } from 'Core/ant/helpers';
import { useAdaptivePopover } from 'Core/utils/userHooks';

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

    const [visible, setVisible, isMobile] = useAdaptivePopover(SPECIAL_BREAKPOINT_FOR_PASSWORD_POPOVER);

    const toggleVisibility = (visibility) => {
        setVisible(visibility);
    };

    const highlightPasswordOnSubmitFailure = () => {
        const isFieldTouched = form.isFieldTouched('password');
        const status = !isFieldTouched ? 'error' : validationStatus;
        return setValidationStatus(status);
    };

    const onSubmit = (values) => {
        const data = values;
        delete data.submit;
        registerAdvertiserAction(trimFormValues(data));
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
                <PasswordValidationRulesPopover visible={visible} isMobile={isMobile} />
                <FormItemWrapper
                    type="password-input"
                    name="password"
                    propsToChild={{
                        onChange: (e) => {
                            checkPatterns(e.target.value);
                            toggleVisibility(true);
                        },
                        onFocus: () => toggleVisibility(true),
                        onClick: () => toggleVisibility(true),
                        onBlur: () => toggleVisibility(false),
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
