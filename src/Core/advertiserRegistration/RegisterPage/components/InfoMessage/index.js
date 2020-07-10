import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';

import history from 'Core/history';
import { ROOT_ROUTES } from 'Core/constants';

import styles from './index.module.scss';

const InfoMessage = ({ setDefaultStateAction }) => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date = date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const registerBtnHandler = () => {
        setDefaultStateAction();
        history.push(ROOT_ROUTES.AD_REGISTRATION);
    };

    return (
        <div className={styles.container}>
            <Result
                className={styles.info}
                title={(
                    <p>
                        Перейдите по&nbsp;ссылке в&nbsp;письме для завершения регистрации
                    </p>
                )}
            />
            <p>
                Ссылка действительна в&nbsp;течении суток
                <br />
                до&nbsp;
                {date}
            </p>
            <Button
                className={styles.btn}
                type="default"
                onClick={registerBtnHandler}
            >
                Зарегестрироваться еще раз
            </Button>
        </div>
    );
};

InfoMessage.defaultProps = {
    setDefaultStateAction: Function.prototype,
};

InfoMessage.propTypes = {
    setDefaultStateAction: PropTypes.func,
};

export default InfoMessage;
