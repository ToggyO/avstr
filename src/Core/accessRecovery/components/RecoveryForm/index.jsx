import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { StandardForm, FormItemWrapper } from 'Core/ant';
import { getProp } from 'Core/utils/getProp';
import { forgotPasswordRequest } from 'Core/accessRecovery/action-creators';

import options from './options';

import style from './style.module.scss';

const RecoveryForm = ({ loading, sendLink }) => {
    const onSubmit = values => {
        sendLink(values);
    };

    return (
        <div className={style.container}>
            <div className={style.headlines}>
                <h1>Восстановление доступа</h1>
                <p>Укажите почту, мы вышлем вам ссылку для изменения пароля.</p>
            </div>
            <StandardForm onFinish={onSubmit} options={options}>
                <FormItemWrapper type="text-input" name="email" />
                <FormItemWrapper
                    type="custom-component"
                    name="submit"
                    component={props => (
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
};

RecoveryForm.defaultProps = {
    loading: false,
    sendLink: Function.prototype,
};

const mapStateToProps = ({ accessRecoveryReducer }) => ({
    loading: getProp(accessRecoveryReducer, 'loading', false),
});

const mapDispatchToProps = (dispatch) => ({
    sendLink: bindActionCreators(forgotPasswordRequest, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryForm);
