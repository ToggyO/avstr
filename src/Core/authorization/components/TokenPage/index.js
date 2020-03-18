import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import userManager from '../../userManager';

const TokenPage = () => {
    const [text, setText] = useState('');
    const handleBtnClick = () => {
        userManager.getUser().then((user) => setText(user.access_token));
    };

    return (
        <div>
            <h1>Сервисная страничка</h1>
            <div
                style={{ marginBottom: '20px' }}
            >
                {text}
            </div>
            <Button onClick={handleBtnClick}>Принести токен :)</Button>
        </div>
    );
};

export default TokenPage;
