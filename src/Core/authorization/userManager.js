import { createUserManager } from 'redux-oidc';

const { REACT_APP_URL, REACT_APP_AUTH_URL } = process.env;

/* const userManagerConfig = {
    client_id: 'avastar-frontend',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'token id_token',
    scope: 'openid avastar-microservices',
    authority: 'http://localhost:3759',
    post_logout_redirect_uri: 'http://localhost:3000',
}; */

/* const userManagerConfig = {
    client_id: 'avastar-frontend',
    redirect_uri: 'http://avastar.smartheadtest.ru/callback',
    response_type: 'token id_token',
    scope: 'openid avastar-microservices',
    authority: 'http://accounts.avastar.smartheadtest.ru',
    post_logout_redirect_uri: 'http://avastar.smartheadtest.ru',
}; */

const userManagerConfig = {
    client_id: 'avastar-frontend',
    redirect_uri: `${REACT_APP_URL}/callback`,
    response_type: 'token id_token',
    scope: 'openid avastar-microservices',
    authority: REACT_APP_AUTH_URL,
    post_logout_redirect_uri: REACT_APP_URL,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
