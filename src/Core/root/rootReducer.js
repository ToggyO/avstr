import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authorizationReducer from 'Core/authorization/authorizationReducer';
import advertiserAccountReducer from 'AdvertiserAccount/advertiserAccountReducer';
import devicesReducer from 'DevicesAccount/devicesReducer';
import accessRecoveryReducer from 'Core/accessRecovery/accessRecoveryReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    authorizationReducer,
    advertiserAccountReducer,
    devicesReducer,
    accessRecoveryReducer,
});

export default rootReducer;
