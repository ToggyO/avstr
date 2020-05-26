import { useEffect, useState } from 'react';
import api from 'Core/api';
import userManager from './userManager';

function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (!isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        userManager.getUser().then((user) => {
            if (user || !user.expired) {
                setIsLoggedIn(true);
                api.setConstantHeader('Authorization', `Bearer ${user.access_token}`);
            } else {
                window.location = '/';
            }
        });
    }, [isFirstRender]);

    return isLoggedIn;
}

export default useIsLoggedIn;
