import React from 'react';
import { Result } from 'antd';

import styles from './index.module.scss';

const InfoMessage = () => {
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
        </div>
    );
};

export default InfoMessage;
