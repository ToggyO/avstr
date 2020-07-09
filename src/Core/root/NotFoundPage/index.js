import React from 'react';
import 'antd/dist/antd.css';
import { Result } from 'antd';

import styles from './index.module.scss';

const NotFoundPage = () => (
    <div className={styles.wrap}>
        <Result
            status="404"
            title="404"
            subTitle="Такой страницы не существует."
        />
    </div>
);

export default NotFoundPage;
