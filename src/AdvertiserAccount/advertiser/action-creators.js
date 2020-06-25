import * as actions from './actions';

export const getAdvertisementsList = (params) => ({
    type: actions.GET_ADVERTISEMENTS_LIST_REQUEST,
    data: params,
});

export const clearAdvertiserErrors = () => ({
    type: actions.ADVERTISER_CLEAR_ERRORS,
});
