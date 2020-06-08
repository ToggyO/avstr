import React from 'react';

import { AccessRecoveryLayout } from '@Core/ant';
import AccessRecoveryRouter from './AccessRecoveryRouter';

import style from './style.module.scss';

const AccessRecoveryPage = () => (
    <AccessRecoveryLayout>
        <div className={style.routes_wrapper}>
            <AccessRecoveryRouter />
        </div>
    </AccessRecoveryLayout>
);

export default AccessRecoveryPage;
