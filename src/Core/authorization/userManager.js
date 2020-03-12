import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'avastar-frontend',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'token id_token',
    scope: 'openid avastar-microservices',
    authority: 'http://accounts.avastar.smartheadtest.ru',
    post_logout_redirect_uri: 'http://localhost:3000',
};


const userManager = createUserManager(userManagerConfig);

export default userManager;
