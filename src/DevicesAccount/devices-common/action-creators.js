import { RECEIVE_GEO_POINTS, REQUEST_GEO_POINTS } from './actions';

export const requestGeoPoints = (data) => ({
    type: REQUEST_GEO_POINTS,
    data,
});
export const receiveGeoPoints = (data) => ({
    type: RECEIVE_GEO_POINTS,
    data,
});
