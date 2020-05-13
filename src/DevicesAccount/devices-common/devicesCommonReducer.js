import {
    RECEIVE_GEO_POINT,
    RECEIVE_ALL_GEO_POINTS,
} from './actions';


const initialState = {
    currentGeoPoint: [],
    allGeoPoints: [],
};

const devicesCommonReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_GEO_POINT:
            return {
                ...state,
                currentGeoPoint: data,
            };
        case RECEIVE_ALL_GEO_POINTS:
            return {
                ...state,
                allGeoPoints: data,
            };
        default:
            return state;
    }
};

export default devicesCommonReducer;
