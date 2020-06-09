// todo(nn): Добавить ссылки на документы, когда они появятся
import React from 'react';
// import { connect } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
// import { getProp } from 'Core/utils/getProp';

import options from './options';

import styles from './index.module.scss';

const AdvRegisterForm = () => {
    const onSubmit = () => {
        // sendLink(values);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headlines}>
                <h1>Регистрация рекламодателя</h1>
            </div>
            <StandardForm onFinish={onSubmit} options={options}>
                <FormItemWrapper type="text-input" name="name" />
                <FormItemWrapper type="text-input" name="surname" />
                <FormItemWrapper type="text-input" name="organisation" />
                <FormItemWrapper type="text-input" name="email" />
                <FormItemWrapper type="password-input" name="password" />
                <FormItemWrapper
                    type="custom-component"
                    name="submit"
                    component={(props) => (
                        <Button
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
