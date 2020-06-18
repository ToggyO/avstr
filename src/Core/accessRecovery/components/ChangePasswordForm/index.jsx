import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Badge,
    Button,
    notification,
    Form,
} from 'antd';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
import { restorePasswordRequest } from 'Core/accessRecovery/action-creators';
import { getProp } from 'Core/utils/getProp';

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

const ChangePasswordForm = ({ loading, restorePassword }) => {
    function showHelp() {
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
    }

    const memoizedShowHelp = useCallback(() => showHelp(), []);

    useEffect(() => {
        memoizedShowHelp();
    }, [memoizedShowHelp]);

    const onSubmit = (values) => {
        restorePassword(values);
    };

    const [form] = Form.useForm();

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
                    <FormItemWrapper type="password-input" name="passwordConfirm" />
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={
                                    !form.isFieldsTouched(true)
                                    || form.getFieldsError()
                                        .filter(({ errors }) => errors.length).length
                                }
                            >
                                Log in
                            </Button>
                        )}
                    </Form.Item>
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
