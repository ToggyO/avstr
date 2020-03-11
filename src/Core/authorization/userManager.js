import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'avastar-frontend',
    redirect_uri: 'http://localhost:5100/#/callback',
    response_type: 'token id_token',
    scope: 'openid avastar-microservices',
    authority: 'http://accounts.avastar.smartheadtest.ru',
    post_logout_redirect_uri: 'http://localhost:5100/index.html',
    // silent_redirect_uri: 'http://localhost:5100/silentRenew.html',
    // automaticSilentRenew: true,
    // filterProtocolClaims: true,
    // loadUserInfo: true,
    // monitorSession: true,
};


const userManager = createUserManager(userManagerConfig);

export default userManager;
