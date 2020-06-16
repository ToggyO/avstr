import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';
import history from 'Core/history';
import Loader from 'Core/common/Loader';
import { Button, Result } from 'antd';
import { confirmAdRegistration } from '../../action-creators';
import ADV_REGISTER_ROUTES from '../../constants/routes';


import styles from './index.module.scss';

const AdRegisterConfirm = ({
    confirmAdRegistrationAction,
    isConfirmSuccess,
    loading,
    error,
}) => {
    const url = new URL(window.location);
    const user = url.searchParams.get('user');
    const code = url.searchParams.get('code');

    useEffect(() => {
        confirmAdRegistrationAction({ email: user, code });
    }, []);

    const handleStartBtnClick = () => {
        history.push('/');
    };

    const handleRegisterBtnClick = () => {
        history.push(ADV_REGISTER_ROUTES.SEND_LINK);
    };

    const renderContent = () => {
        let component;
        if (loading) {
            component = <Loader />;
        } else if (isConfirmSuccess && !error) {
            component = (
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
            );
        } else {
            component = (
                <>
                    <Result
                        status="error"
                        title="Истек срок действия ссылки"
                        subTitle="Для создания новой ссылки зарегистрируйтесь повторно"
                    />
                    <Button
                        className={styles.btn}
                        size="large"
                        type="outline"
                        onClick={handleRegisterBtnClick}
                    >
                        Регистрация
                    </Button>
                </>
            );
        }
        return component;
    };

    return (
        <div className={styles.container}>
            {renderContent()}
        </div>
    );
};


AdRegisterConfirm.defaultProps = {
    isConfirmSuccess: false,
    loading: false,
    error: null,
    confirmAdRegistrationAction: Function.prototype,
};

AdRegisterConfirm.propTypes = {
    isConfirmSuccess: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.string,
    confirmAdRegistrationAction: PropTypes.func,
};


const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    isConfirmSuccess: getProp(advertiserRegistrationReducer, 'isConfirmSuccess', false),
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
    error: getProp(advertiserRegistrationReducer, 'error', null),
});

const mapDispatchToProps = {
    confirmAdRegistrationAction: confirmAdRegistration,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdRegisterConfirm);
