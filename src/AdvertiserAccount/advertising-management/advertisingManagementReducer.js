import * as actions from './actions';

const initialState = {
    loading: false,
    fileUploadStatus: '',
    xhr: null,
    uploadedFileContent: {
        name: '',
        creationTime: '',
        url: '',
        lastModificationTime: '',
        id: null,
    },
    advertisements: [],
    advertisersPending: false,
    advertisers: [],
    errors: {},
};

const advertisingManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case actions.UPLOAD_FILE:
            return {
                ...state,
                loading: true,
            };

        case actions.CHANGE_UPLOAD_STATUS:
            return {
                ...state,
                fileUploadStatus: data,
                loading: data === 'Error'
                    ? false
                    : state.loading,
            };

        case actions.SAVE_XHR:
            return {
                ...state,
                xhr: data,
            };

        case actions.CLEAN_XHR:
            return {
                ...state,
                xhr: null,
            };

        case actions.RECEIVE_UPLOADED_CONTENT:
            return {
                ...state,
                loading: false,
                uploadedFileContent: data,
            };

        case actions.RECEIVE_ADVERTISEMENTS:
            return {
                ...state,
                advertisements: data,
            };

        case actions.GET_ADVERTISERS_LIST_REQUEST:
            return {
                ...state,
                advertisers: [],
                advertisersPending: true,
            };

        case actions.GET_ADVERTISERS_LIST_SUCCESS:
            return {
                ...state,
                advertisers: data,
                advertisersPending: false,
            };

        case actions.GET_ADVERTISERS_LIST_ERROR:
            return {
                ...state,
                advertisers: [],
                advertisersPending: false,
            };

        case actions.RESET_ADVERTISERS_LIST:
            return {
                ...state,
                advertisers: [],
            };

        case actions.ADVERTISER_MANAGEMENT_PUT_ERRORS:
            return {
                ...state,
                loading: false,
                errors: data,
            };
        case actions.ADVERTISER_MANAGEMENT_CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };
        default:
            return state;
    }
};

export default advertisingManagementReducer;
