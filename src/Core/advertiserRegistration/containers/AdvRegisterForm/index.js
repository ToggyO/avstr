// todo(nn): Добавить ссылки на документы, когда они появятся
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { getProp } from 'Core/utils/getProp';

import { Form, Button } from 'antd';
import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';

import styles from './index.module.scss';

const AdvRegisterForm = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState(); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);


    const onFinishFailed = () => {

    };

    const onSubmit = () => {
        // sendLink(values);
    };

    const isBtnDisabled = () => {
        console.log(!form.isFieldsTouched());
        console.log(form.getFieldsError().filter(({ errors }) => errors.length).length);
        return (form.isFieldsTouched()
            || form.getFieldsError().filter(({ errors }) => errors.length).length);
    };


    return (
        <div className={styles.container}>
            <div className={styles.headlines}>
                <h1>Регистрация рекламодателя</h1>
            </div>
            <StandardForm
                outerFormInstance={form}
                options={options}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
            >
                <FormItemWrapper type="text-input" name="name" />
                <FormItemWrapper type="text-input" name="surname" />
                <FormItemWrapper type="text-input" name="organisation" />
                <FormItemWrapper type="text-input" name="email" />
                <FormItemWrapper type="password-input" name="password" />
                <FormItemWrapper
                    shouldUpdate
                    type="custom-component"
                    name="submit"
                    component={(props) => (
                        <Button
                            disabled={isBtnDisabled()}
                            // loading={loading}
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
        </div>
    );
};

AdvRegisterForm.defaultProps = {
    loading: false,
    sendLink: Function.prototype,
};

AdvRegisterForm.propTypes = {
    loading: PropTypes.bool,
    sendLink: PropTypes.func,
};


/* const mapStateToProps = ({ accessRecoveryReducer }) => ({
    // loading: getProp(accessRecoveryReducer, 'loading', false),
});

const mapDispatchToProps = () => ({
    // sendLink: forgotPasswordRequest,
}); */

export default /* connect(mapStateToProps, mapDispatchToProps)( */AdvRegisterForm/* ) */;
