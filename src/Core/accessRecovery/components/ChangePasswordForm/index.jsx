import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, notification } from 'antd';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
import { restorePasswordRequest } from 'Core/accessRecovery/action-creators';
import { getProp } from 'Core/utils/getProp';

import options from './options';

import styles from './index.module.scss';

// todo(nn): Вынести эту ф-ность, т.к юзается такая же на стр AdRegistration
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

const ChangePasswordForm = ({ loading, restorePassword }) => {
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

    useEffect(() => {
        showHelp();
    }, []);

    const onSubmit = (values) => {
        restorePassword(values);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headlines}>
                    <h1>Изменение пароля</h1>
                </div>
                <StandardForm onFinish={onSubmit} options={options}>
                    <FormItemWrapper
                        type="password-input"
                        name="password"
                        propsToChild={{
                            onFocus: () => showHelp(),
                        }}
                    />
                    <FormItemWrapper type="password-input" name="passwordConfirm" />
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
    loading: PropTypes.bool,
    restorePassword: PropTypes.func,
};

ChangePasswordForm.defaultProps = {
    loading: false,
    restorePassword: Function.prototype,
};

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
});

const mapDispatchToProps = {
    restorePassword: restorePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
