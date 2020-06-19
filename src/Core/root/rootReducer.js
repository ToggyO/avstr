import { combineReducers } from 'redux';

import authorizationReducer from 'Core/authorization/authorizationReducer';
import advertiserAccountReducer from 'AdvertiserAccount/advertiserAccountReducer';
import devicesReducer from 'DevicesAccount/devicesReducer';
import accessRecoveryReducer from 'Core/accessRecovery/accessRecoveryReducer';
import advertiserRegistrationReducer from 'Core/advertiserRegistration/advertiserRegistrationReducer';

const rootReducer = combineReducers({
    authorizationReducer,
    advertiserAccountReducer,
    devicesReducer,
    accessRecoveryReducer,
    advertiserRegistrationReducer,
});

export default rootReducer;
