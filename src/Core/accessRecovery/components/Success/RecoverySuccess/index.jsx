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
                    отправлена на почту
                    {recoveredEmail}
                </p>
            )}
            subTitle="Следуйте инструкциям в сообщении"
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
