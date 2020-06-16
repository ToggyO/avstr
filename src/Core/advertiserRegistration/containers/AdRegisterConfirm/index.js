import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';
import history from 'Core/history';
import { Button, Result } from 'antd';
import { confirmAdRegistration } from '../../action-creators';
import ADV_REGISTER_ROUTES from '../../constants/api-urls';


import styles from '../AdvRegisterForm/index.module.scss';

const AdRegisterConfirm = ({ confirmAdRegistrationAction, isConfirmSuccess, error }) => {
    console.log(error);
    const url = new URL(window.location);
    const user = url.searchParams.get('user');
    const code = url.searchParams.get('code');

    useEffect(() => {
        confirmAdRegistrationAction({ email: user, code });
    });

    const handleStartBtnClick = () => {
        history.push('/');
    };

    const handleRegisterBtnClick = () => {
        history.push(ADV_REGISTER_ROUTES.SEND_LINK);
    };

    return (
        <div className={styles.container}>
            {isConfirmSuccess
                ? (
                    <>
                        <Result
                            status="success"
                            title="Регистрация завершена"
                        />
                        <Button
                            size="large"
                            type="outline"
                            onClick={handleStartBtnClick}
                        >
                            Начать работу
                        </Button>
                    </>
                )
                : (
                    <>
                        <Result
                            status="error"
                            title="Истек срок действия ссылки"
                            subTitle="Для создания новой ссылки зарегистрируйтесь повторно"
                        />
                        <Button
                            size="large"
                            type="outline"
                            onClick={handleRegisterBtnClick}
                        >
                            Регистрация
                        </Button>
                    </>
                )}
        </div>
    );
};


AdRegisterConfirm.defaultProps = {
    isConfirmSuccess: false,
    error: null,
    confirmAdRegistrationAction: Function.prototype,
};

AdRegisterConfirm.propTypes = {
    isConfirmSuccess: PropTypes.bool,
    error: PropTypes.string,
    confirmAdRegistrationAction: PropTypes.func,
};


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    isConfirmSuccess: getProp(advertiserRegistrationReducer, 'isConfirmSuccess', false),
    error: getProp(advertiserRegistrationReducer, 'error', null),
});

const mapDispatchToProps = {
    confirmAdRegistrationAction: confirmAdRegistration,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdRegisterConfirm);
