import React from 'react';

import LoginLayout from '../ant/components/Layouts/LoginLayout';
import AdvRegistrationRouter from './AdvRegistrationRouter';

import styles from './index.module.scss';


const AdvertiserRegistrationPage = () => (
    <LoginLayout>
        <div className={styles.container}>
            <AdvRegistrationRouter />
        </div>
    </LoginLayout>
);


export default AdvertiserRegistrationPage;
