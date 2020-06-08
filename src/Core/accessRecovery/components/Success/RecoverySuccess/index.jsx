import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const RecoverySuccess = ({ recoveredEmail }) => (
    <div className={style.wrapper}>
        <Result
            status="success"
            title={(
                <p className={style.title}>
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
