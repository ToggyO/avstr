import { createContext } from 'react';

const AuthContext = createContext({
    isAuthorized: false,
    roles: [],
});

export default AuthContext;
