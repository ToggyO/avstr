import { combineReducers } from 'redux';
import advertisingManagementReducer from './advertising-management/advertisingManagementReducer';

const advertiserAccountReducer = combineReducers({
    advertisingManagementReducer,
});

export default advertiserAccountReducer;
