import * as actions from './actions';

const initialState = {
    loading: false,
    items: [],
    pagination: {},
    errors: [],
};

const advertisingManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case actions.GET_ADVERTISEMENTS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_ADVERTISEMENTS_LIST_SUCCESS: {
            const { items, pagination } = data;
            return {
                ...state,
                loading: false,
                items,
                pagination: {
                    total: pagination.itemsTotal,
                    current: pagination.page,
                    pageSize: pagination.size,
                },
            };
        }
        case actions.GET_ADVERTISEMENTS_LIST_ERROR:
            return {
                ...state,
                loading: false,
                errors: data,
            };
        case actions.ADVERTISER_CLEAR_ERRORS:
            return {
                ...state,
                errors: [],
            };
        default:
            return state;
    }
};

export default advertisingManagementReducer;
