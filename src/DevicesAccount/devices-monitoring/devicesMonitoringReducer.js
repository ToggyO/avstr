import {
    RECEIVE_DEVICE_CONTENT,
} from './actions';


const initialState = {
    currentDevice: {
        name: '',
        serialNumber: '',
        isActive: true,
        isAdvertisementsDisabled: false,
        id: null,
    },
};


const devicesMonitoringReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_DEVICE_CONTENT:
            return {
                ...state,
                currentDevice: data,
            };
        default:
            return state;
    }
};

export default devicesMonitoringReducer;
