import { createUserManager } from 'redux-oidc';

const {
    REACT_APP_REDIRECT_URL,
    REACT_APP_AUTH_URL,
    REACT_APP_CALLBACK_PATH,
    REACT_APP_SILENT_RENEW_PATH,
} = process.env;

const userManagerConfig = {
    client_id: 'avastar-frontend',
    authority: REACT_APP_AUTH_URL,
    redirect_uri: `${REACT_APP_REDIRECT_URL}${REACT_APP_CALLBACK_PATH}`,
    response_type: 'token id_token',
    scope: 'openid avastar-microservices IdentityServerApi',
    post_logout_redirect_uri: REACT_APP_REDIRECT_URL,
    silent_redirect_uri: `${REACT_APP_REDIRECT_URL}${REACT_APP_SILENT_RENEW_PATH}`,
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: false,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
