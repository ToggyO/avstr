// todo(nn): Добавить ссылки на документы, когда они появятся
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';

import { Button } from 'antd';
import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';
import { registerAdvertiser } from '../../action-creators';

import styles from './index.module.scss';

const AdvRegisterForm = ({ registerAdvertiserAction, loading }) => {
    const onFinishFailed = () => {

    };

    const onSubmit = (values) => {
        const data = values;
        delete data.submit;
        console.log(data); // спросить у Олега
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
                            // disabled={isBtnDisabled()}
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
        </div>
    );
};

AdvRegisterForm.defaultProps = {
    loading: false,
    registerAdvertiserAction: Function.prototype,
};

AdvRegisterForm.propTypes = {
    loading: PropTypes.bool,
    registerAdvertiserAction: PropTypes.func,
};


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
});

const mapDispatchToProps = {
    registerAdvertiserAction: registerAdvertiser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvRegisterForm);
