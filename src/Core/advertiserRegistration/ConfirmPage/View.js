import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import history from 'Core/history';
import { PageLoading } from 'Core/ant';
import { Button, Result } from 'antd';
import { parse } from 'qs';
import { useDidMount } from 'beautiful-react-hooks';

import { ROOT_ROUTES } from 'Core/constants';

import styles from './index.module.scss';

const ConfirmPageView = ({
    confirmAdRegistrationAction,
    isConfirmSuccess,
    location,
}) => {
    const queries = parse(location.search, { ignoreQueryPrefix: true, charsetSentinel: true });
    const { user, code } = queries;

    useDidMount(() => {
        confirmAdRegistrationAction({ email: user, code });
    });

    const handleStartBtnClick = () => {
        history.push('/');
    };

    const handleRegisterBtnClick = () => {
        history.push(ROOT_ROUTES.AD_REGISTRATION);
    };

    const renderContent = () => {
        let component = <PageLoading />;
        if (isConfirmSuccess !== null) {
            const condition = isConfirmSuccess;
            const status = condition ? 'success' : 'error';
            const title = condition ? 'Регистрация завершена' : 'Истек срок действия ссылки';
            const subTitle = condition ? null : 'Для создания новой ссылки зарегистрируйтесь повторно';
            const btnText = condition ? 'Начать работу' : 'Регистрация';
            const clickHandler = condition ? handleStartBtnClick : handleRegisterBtnClick;
            const resultClass = condition ? cn(styles.result, styles.success) : cn(styles.result, styles.error);

            component = (
                <>
                    <Result
                        className={resultClass}
                        status={status}
                        title={(
                            <p className={styles.title}>
                                {title}
                            </p>
                        )}
                        subTitle={(
                            <p className={styles.subtitle}>
                                {subTitle}
                            </p>
                        )}
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

ConfirmPageView.defaultProps = {
    isConfirmSuccess: false,
    confirmAdRegistrationAction: Function.prototype,
};

ConfirmPageView.propTypes = {
    isConfirmSuccess: PropTypes.bool,
    confirmAdRegistrationAction: PropTypes.func,
    location: PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.shape(),
    }).isRequired,
};

export default ConfirmPageView;
