import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const RecoverySuccess = ({ recoveredEmail }) => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date = date.toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div className={styles.wrapper}>
            <Result
                status="success"
                title={(
                    <p className={styles.title}>
                        Ссылка для смены пароля
                        <br />
                        отправлена на почту&nbsp;
                        {recoveredEmail}
                    </p>
                )}
                subTitle={(
                    <p className={styles.subtitle}>
                        Ссылка действительна в течении суток до&nbsp;
                        {date}
                    </p>
                )}
            />
        </div>
    );
};

RecoverySuccess.propTypes = {
    recoveredEmail: PropTypes.string,
};

RecoverySuccess.defaultProps = {
    recoveredEmail: '',
};

export default RecoverySuccess;
