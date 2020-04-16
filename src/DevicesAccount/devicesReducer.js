import { combineReducers } from 'redux';
import devicesManagementReducer from './devices-managment/devicesManagementReducer';
import devicesMonitoringReducer from './devices-monitoring/devicesMonitoringReducer';


const devicesReducer = combineReducers({
    devicesManagementReducer,
    devicesMonitoringReducer,
});

export default devicesReducer;
