import React, { useCallback, useEffect } from 'react';
import {
    Badge,
    Button,
    notification,
    Form,
} from 'antd';
import { Redirect } from 'react-router-dom';
import { parse } from 'qs';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';

import styles from './index.module.scss';

const RenderValidationStatus = () => (
    <div>
        <Badge status="default" text="8 и более символов" />
        <Badge status="default" text="прописные латинские буквы от A до Z" />
        <Badge status="default" text="строчные латинские буквы от a до z" />
        <Badge status="default" text="цифры от 0 до 9" />
        <Badge
            status="default"
            text={'знаки пунктуации ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` {|} ~'}
        />
    </div>
);

const ChangePasswordForm = ({
    location,
    loading,
    restorePassword,
    clearErrors,
}) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true, charsetSentinel: true });
    const { user, code } = queries;

    const [form] = Form.useForm();

    const showHelp = () => {
        notification.info({
            key: 'passwordHelp',
            message: 'Требования для безопасного пароля',
            description: <RenderValidationStatus />,
            duration: null,
            top: '45%',
            style: {
                width: 400,
            },
        });
    };

    const closeHelp = () => notification.close('passwordHelp');

    const memoizedShowHelp = useCallback(() => showHelp(), []);

    useEffect(() => {
        memoizedShowHelp();
        return () => {
            closeHelp();
            clearErrors();
        };
    }, [clearErrors, memoizedShowHelp]);

    const onSubmit = (values) => {
        const payload = {
            email: user,
            password: values.password,
            confirmPassword: values.confirmPassword,
            code,
        };
        restorePassword(payload);
    };

    if (!code) return <Redirect to="/" />;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headlines}>
                    <h1>Изменение пароля</h1>
                </div>
                <StandardForm onFinish={onSubmit} options={options} outerFormInstance={form}>
                    <FormItemWrapper
                        type="password-input"
                        name="password"
                        propsToChild={{
                            onFocus: () => memoizedShowHelp(),
                        }}
                    />
                    <FormItemWrapper type="password-input" name="confirmPassword" />
                    <FormItemWrapper
                        type="custom-component"
                        name="submit"
                        component={(props) => (
                            <Button
                                loading={loading}
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
        [PropTypes.string]: PropTypes.any,
    }).isRequired,
    loading: PropTypes.bool,
    restorePassword: PropTypes.func,
    clearErrors: PropTypes.func,
};

ChangePasswordForm.defaultProps = {
    loading: false,
    restorePassword: Function.prototype,
    clearErrors: Function.prototype,
};

export default ChangePasswordForm;
