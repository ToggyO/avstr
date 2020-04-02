import { combineReducers } from 'redux';
import devicesManagementReducer from './devices-managment/devicesManagementReducer';

const devicesReducer = combineReducers({
    devicesManagementReducer,
});

export default devicesReducer;
