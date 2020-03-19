import { combineReducers } from 'redux';
import authorizationReducer from 'Core/authorization/authorizationReducer';
import advertiserAccountReducer from 'AdvertiserAccount/advertiserAccountReducer';

const rootReducer = combineReducers({
    authorizationReducer,
    advertiserAccountReducer,
});

export default rootReducer;
