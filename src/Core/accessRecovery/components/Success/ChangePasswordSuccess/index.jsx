import React from 'react';
import { Button, Result } from 'antd';

import history from 'Core/history';
import styles from '../RecoverySuccess/index.module.scss';

const ChangePasswordSuccess = () => (
    <div className={styles.wrapper}>
        <Result
            status="success"
            title="Ваш пароль успешно изменен"
            extra={[
                <Button
                    type="primary"
                    ghost
                    onClick={() => history.push('/')}
                >
                    Войти в систему
                </Button>,
            ]}
        />
    </div>
);

export default ChangePasswordSuccess;
