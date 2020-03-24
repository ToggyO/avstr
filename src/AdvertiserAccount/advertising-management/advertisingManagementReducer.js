import {
    CHANGE_UPLOAD_STATUS,
    RECEIVE_UPLOADED_CONTENT,
    RECEIVE_ADVERTISEMENTS,
} from './actions';


const initialState = {
    fileUploadStatus: '',
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
        case CHANGE_UPLOAD_STATUS:
            return {
                ...state,
                fileUploadStatus: data,
            };
        case RECEIVE_UPLOADED_CONTENT:
            return {
                ...state,
                uploadedFileContent: data,
            };
        case RECEIVE_ADVERTISEMENTS:
            return {
                ...state,
                advertisements: data,
            };
        default:
            return state;
    }
};

export default advertisingManagementReducer;
