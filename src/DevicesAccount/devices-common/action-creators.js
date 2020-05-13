import {
    RECEIVE_GEO_POINT,
    REQUEST_GEO_POINT,
    REQUEST_ALL_GEO_POINTS,
    RECEIVE_ALL_GEO_POINTS,
} from './actions';

export const requestGeoPoint = (data) => ({
    type: REQUEST_GEO_POINT,
    data,
});
export const receiveGeoPoint = (data) => ({
    type: RECEIVE_GEO_POINT,
    data,
});


export const requestAllGeoPoints = (data) => ({
    type: REQUEST_ALL_GEO_POINTS,
    data,
});
export const receiveAllGeoPoints = (data) => ({
    type: RECEIVE_ALL_GEO_POINTS,
    data,
});
