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
    cleanErrorAction,
    isConfirmSuccess,
    loading,
    error,
    location,
}) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true, charsetSentinel: true });
    const { user, code } = queries;

    useEffect(() => {
        confirmAdRegistrationAction({ email: user, code });

        return () => {
            cleanErrorAction();
        };
    }, [cleanErrorAction]);


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
            const condition = isConfirmSuccess && !error;
            const status = condition ? 'success' : 'error';
            const title = condition ? 'Регистрация завершена' : 'Истек срок действия ссылки';
            const subTitle = condition ? null : 'Для создания новой ссылки зарегистрируйтесь повторно';
            const btnText = condition ? 'Начать работу' : 'Регистрация';
            const clickHandler = condition ? handleStartBtnClick : handleRegisterBtnClick;

            component = (
                <>
                    <Result
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
    error: null,
    confirmAdRegistrationAction: Function.prototype,
    cleanErrorAction: Function.prototype,
};

AdvRegisterConfirm.propTypes = {
    isConfirmSuccess: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.string,
    confirmAdRegistrationAction: PropTypes.func,
    cleanErrorAction: PropTypes.func,
    location: PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.shape(),
    }).isRequired,
};


export default AdvRegisterConfirm;

// useEffect(() => {
//     let isShown = true;
//     if (isShown && loading) {
//         message.loading('Дождитесь завершения операции', 0);
//     } else {
//         message.destroy();
//     }
//     return () => {
//         isShown = false;
//     };
// }, [loading]);
