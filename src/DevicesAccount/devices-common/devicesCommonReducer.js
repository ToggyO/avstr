import { RECEIVE_GEO_POINTS } from './actions';


const initialState = {
    geoPoints: [],
};


const devicesCommonReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case RECEIVE_GEO_POINTS:
            return {
                ...state,
                geoPoints: data,
            };
        default:
            return state;
    }
};

export default devicesCommonReducer;
