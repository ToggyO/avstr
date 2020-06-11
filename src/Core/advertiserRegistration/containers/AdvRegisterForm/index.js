// todo(nn): Добавить ссылки на документы, когда они появятся
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';

import {
    Badge, Button, Result, notification,
} from 'antd';
import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';
import { registerAdvertiser } from '../../action-creators';

import styles from './index.module.scss';

// todo(nn): Вынести эту ф-ность, т.к юзается такая же на стр Recovery
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

const AdvRegisterForm = ({ registerAdvertiserAction, loading, isRegisterReqSuccess }) => {
    const showHelp = () => {
        notification.info({
            key: 'passwordHelp',
            message: 'Требования для безопасного пароля',
            description: <RenderValidationStatus />,
            duration: null,
            top: '62%',
            style: {
                width: 400,
            },
        });
    };

    useEffect(() => {
        showHelp();
    }, []);

    const onFinishFailed = () => {

    };

    const onSubmit = (values) => {
        const data = values;
        delete data.submit;
        registerAdvertiserAction(data);
    };

    return (
        <div className={styles.container}>
            {isRegisterReqSuccess
                ? (
                    <Result subTitle="Перейдите по ссылке в письме на электронной почте для завершения регистрации" />
                )
                : (
                    <>
                        <div className={styles.headlines}>
                            <h1>Регистрация рекламодателя</h1>
                        </div>
                        <StandardForm
                            options={options}
                            onFinish={onSubmit}
                            onFinishFailed={onFinishFailed}
                        >
                            <FormItemWrapper type="text-input" name="name" />
                            <FormItemWrapper type="text-input" name="surname" />
                            <FormItemWrapper type="text-input" name="organization" />
                            <FormItemWrapper type="text-input" name="email" />
                            <FormItemWrapper type="password-input" name="password" />
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
                                        Зарегестрироваться
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
};

AdvRegisterForm.propTypes = {
    loading: PropTypes.bool,
    isRegisterReqSuccess: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
};


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
    isRegisterReqSuccess: getProp(advertiserRegistrationReducer, 'isRegisterReqSuccess', false),
});

const mapDispatchToProps = {
    registerAdvertiserAction: registerAdvertiser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvRegisterForm);
