import React from 'react';
import { Button, Result } from 'antd';

import style from '../RecoverySuccess/style.module.scss';

const ChangePasswordSuccess = () => (
    <div className={style.wrapper}>
        <Result
            status="success"
            title="Ваш пароль успешно изменен"
            extra={[
                <Button type="primary" ghost>Войти в систему</Button>,
            ]}
        />
    </div>
);

export default ChangePasswordSuccess;
