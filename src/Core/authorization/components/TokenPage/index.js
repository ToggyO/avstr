import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import Container from 'Core/common/Container';

import userManager from '../../userManager';

const TokenPage = () => {
    const [text, setText] = useState('');
    const handleBtnClick = () => {
        userManager.getUser().then((user) => {
            setText(user.access_token);
        });
    };

    const handleCopyBtn = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Container>
            <h1>Сервисная страничка</h1>
            <div style={{ marginBottom: '20px' }}>
                {text}
            </div>
            <Button onClick={handleBtnClick}>Получить токен</Button>
            <Button onClick={handleCopyBtn}>Копировать токен</Button>
        </Container>
    );
};

export default TokenPage;
