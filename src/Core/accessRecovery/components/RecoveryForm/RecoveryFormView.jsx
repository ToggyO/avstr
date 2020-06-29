import React, { useEffect } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
import options from './options';

import styles from './index.module.scss';

const RecoveryForm = ({ loading, sendLink, errorsFromBackend, clearErrors }) => {
    useEffect(() => () => clearErrors(), [clearErrors]);

    const onSubmit = (values) => {
        const payload = {
            email: values.email,
        };
        sendLink(payload);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headlines}>
                <h1>Восстановление доступа</h1>
                <p>Укажите почту, мы вышлем вам ссылку для изменения пароля.</p>
            </div>
            <StandardForm onFinish={onSubmit} options={options} errorsFromBackend={errorsFromBackend}>
                <FormItemWrapper type="text-input" name="email" />
                <FormItemWrapper
                    type="custom-component"
                    name="submit"
                    component={(props) => (
                        <Button
                            loading={loading}
                            {...props}
                        >
                            Отправить ссылку
                        </Button>
                    )}
                />
            </StandardForm>
        </div>
    );
};

RecoveryForm.propTypes = {
    loading: PropTypes.bool,
    sendLink: PropTypes.func,
    errorsFromBackend: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    clearErrors: PropTypes.func,
};

RecoveryForm.defaultProps = {
    loading: false,
    sendLink: Function.prototype,
    errorsFromBackend: {},
    clearErrors: Function.prototype,
};

export default RecoveryForm;
