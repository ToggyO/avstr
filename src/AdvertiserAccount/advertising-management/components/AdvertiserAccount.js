import React from 'react';

import userManager from '../../../Core/authorization/userManager';

import styles from './AdvertiserAccount.module.scss';
import NavBar from '../../../Core/common/NavBar/NavBar';


const AdvertiserAccount = () => {
    const handleBtnClick = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
    };

    return (
        <div className={styles.wrap}>
            <NavBar handleLogoutClick={handleBtnClick} />
            <h1>
                Кабинет рекламодателя
            </h1>
        </div>
    );
};

export default AdvertiserAccount;
