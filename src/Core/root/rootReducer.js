import { combineReducers } from 'redux';
import authorizationReducer from 'Core/authorization/authorizationReducer';
import advertiserAccountReducer from 'AdvertiserAccount/advertiserAccountReducer';
import devicesReducer from 'DevicesAccount/devicesReducer';

const rootReducer = combineReducers({
    authorizationReducer,
    advertiserAccountReducer,
    devicesReducer,
});

export default rootReducer;
