import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';
import Loader from 'Core/common/Loader';
import { Button, Result } from 'antd';
import { parse } from 'qs';

import ADV_REGISTER_ROUTES from '../../constants/routes';


import styles from './index.module.scss';

const AdvRegisterConfirm = ({
    confirmAdRegistrationAction,
    isConfirmSuccess,
    loading,
    location,
}) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true, charsetSentinel: true });
    const { user, code } = queries;

    useEffect(() => {
        confirmAdRegistrationAction({ email: user, code });
    }, []);


    const handleStartBtnClick = () => {
        history.push('/');
    };

    const handleRegisterBtnClick = () => {
        history.push(ADV_REGISTER_ROUTES.REGISTER);
    };

    const renderContent = () => {
        let component;
        if (loading) {
            component = <Loader />;
        } else {
            const condition = isConfirmSuccess;
            const status = condition ? 'success' : 'error';
            const title = condition ? 'Регистрация завершена' : 'Истек срок действия ссылки';
            const subTitle = condition ? null : 'Для создания новой ссылки зарегистрируйтесь повторно';
            const btnText = condition ? 'Начать работу' : 'Регистрация';
            const clickHandler = condition ? handleStartBtnClick : handleRegisterBtnClick;
            const resultClass = condition ? styles.success : styles.error;

            component = (
                <>
                    <Result
                        className={resultClass}
                        status={status}
                        title={title}
                        subTitle={subTitle}
                    />
                    <Button
                        className={styles.btn}
                        size="large"
                        type="outline"
                        onClick={clickHandler}
                    >
                        {btnText}
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


AdvRegisterConfirm.defaultProps = {
    isConfirmSuccess: false,
    loading: false,
    confirmAdRegistrationAction: Function.prototype,
};

AdvRegisterConfirm.propTypes = {
    isConfirmSuccess: PropTypes.bool,
    loading: PropTypes.bool,
    confirmAdRegistrationAction: PropTypes.func,
    location: PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.shape(),
    }).isRequired,
};


export default AdvRegisterConfirm;
