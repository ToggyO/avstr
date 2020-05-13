import { combineReducers } from 'redux';
import devicesCommonReducer from './devices-common/devicesCommonReducer';
import devicesManagementReducer from './devices-managment/devicesManagementReducer';
import devicesMonitoringReducer from './devices-monitoring/devicesMonitoringReducer';


const devicesReducer = combineReducers({
    devicesCommonReducer,
    devicesManagementReducer,
    devicesMonitoringReducer,
});

export default devicesReducer;
