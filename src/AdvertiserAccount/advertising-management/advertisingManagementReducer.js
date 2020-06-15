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
        default:
            return state;
    }
};

export default advertisingManagementReducer;
