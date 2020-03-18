import React from 'react';
import { Button } from 'semantic-ui-react';

import userManager from '../../userManager';

const TokenPage = () => {
    const handleBtnClick = () => {
        userManager.getUser().then((user) => alert(user.access_token));
    };

    return (
        <div>
            <h1>Сервисная страничка</h1>
            <Button onClick={handleBtnClick}>Принести токен :)</Button>
        </div>
    );
};

export default TokenPage;
