import React from 'react';

import { AccessRecoveryLayout } from 'Core/ant';
import AccessRecoveryRouter from './AccessRecoveryRouter';

import styles from './index.module.scss';

const AccessRecoveryPage = () => (
    <AccessRecoveryLayout>
        <div className={styles.routesWrapper}>
            <AccessRecoveryRouter />
        </div>
    </AccessRecoveryLayout>
);

export default AccessRecoveryPage;
