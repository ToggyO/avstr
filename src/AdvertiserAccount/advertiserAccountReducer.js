import { combineReducers } from 'redux';

import advertiserReducer from './advertiser/advertiserReducer';
import advertisingManagementReducer from './advertising-management/advertisingManagementReducer';

const advertiserAccountReducer = combineReducers({
    advertiserReducer,
    advertisingManagementReducer,
});

export default advertiserAccountReducer;
