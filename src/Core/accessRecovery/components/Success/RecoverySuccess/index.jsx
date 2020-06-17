import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const RecoverySuccess = ({ recoveredEmail }) => (
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
                    Следуйте инструкциям в сообщении
                </p>
            )}
        />
    </div>
);

RecoverySuccess.propTypes = {
    recoveredEmail: PropTypes.string,
};

RecoverySuccess.defaultProps = {
    recoveredEmail: '',
};

export default RecoverySuccess;
