import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Form,
} from 'antd';
import { parse } from 'qs';
import PropTypes from 'prop-types';

import {
    StandardForm,
    FormItemWrapper,
    PasswordValidationRulesPopover,
} from 'Core/ant';
import { useValidationStatus } from 'Core/ant/helpers';
import trimFormValues from 'Core/utils/trimFormValues';
import { SPECIAL_BREAKPOINT_FOR_PASSWORD_POPOVER } from 'Core/constants';
import { useAdaptivePopover } from 'Core/utils/userHooks';
import options from './options';

import styles from './index.module.scss';

const ChangePasswordForm = ({
    location,
    loading,
    restorePassword,
    errorsFromBackend,
    clearErrors,
}) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true, charsetSentinel: true });
    const { user, code } = queries;

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

    useEffect(() => () => {
        clearErrors();
    }, [clearErrors]);

    const toggleVisibility = (visibility) => {
        setVisible(visibility);
    };

    const onSubmit = (values) => {
        const payload = {
            email: user,
            password: values.password,
            confirmPassword: values.confirmPassword,
            code,
        };
        restorePassword(trimFormValues(payload));
    };

    const highlightPasswordOnSubmitFailure = () => {
        const isFieldTouched = form.isFieldTouched('password');
        const status = !isFieldTouched ? 'error' : validationStatus;
        return setValidationStatus(status);
    };

    if (!code) return <Redirect to="/" />;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headlines}>
                    <h1>Изменение пароля</h1>
                </div>
                <StandardForm
                    onFinish={onSubmit}
                    onFinishFailed={highlightPasswordOnSubmitFailure}
                    options={options}
                    outerFormInstance={form}
                    errorsFromBackend={errorsFromBackend}
                >
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
                    <FormItemWrapper type="password-input" name="confirmPassword" hasFeedback />
                    <FormItemWrapper
                        type="custom-component"
                        name="submit"
                        component={(props) => (
                            <Button
                                loading={loading}
                                className={styles.submit}
                                {...props}
                            >
                                Сохранить
                            </Button>
                        )}
                    />
                </StandardForm>
            </div>
        </>
    );
};

ChangePasswordForm.propTypes = {
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool,
    restorePassword: PropTypes.func,
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
    clearErrors: PropTypes.func,
};

ChangePasswordForm.defaultProps = {
    loading: false,
    restorePassword: Function.prototype,
    errorsFromBackend: {},
    clearErrors: Function.prototype,
};

export default ChangePasswordForm;
