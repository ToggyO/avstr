// todo(nn): Добавить ссылки на документы, когда они появятся
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    Badge, Button, Result, notification, message,
} from 'antd';
import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';

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

const AdvRegisterForm = ({
    registerAdvertiserAction,
    loading,
    isRegisterReqSuccess,
    error,
    cleanErrorAction,
}) => {
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
    const closeHelp = () => notification.close('passwordHelp');

    useEffect(() => {
        showHelp();

        return () => {
            closeHelp();
            cleanErrorAction();
        };
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
