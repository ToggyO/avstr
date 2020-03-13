import React from 'react';

import { Button } from 'semantic-ui-react';
import userManager from '../../../Core/authorization/userManager';


const AdvertiserAccount = () => {
    const handleBtnClick = () => {
        userManager.signoutRedirect();
        userManager.removeUser();
    };

    return (
        <div>
            <h1>
                Advertiser Account
            </h1>
            {/* <Button
                onClick={() => {
                    userManager.getUser().then((user) => alert(user.access_token));
                }}
            >
                Токен
            </Button> */}

            <Button onClick={handleBtnClick}>
                Выйти
            </Button>
        </div>
    );
};

export default AdvertiserAccount;
