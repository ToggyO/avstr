import { CHANGE_UPLOAD_STATUS, RECEIVE_UPLOADED_CONTENT } from './actions';


const initialState = {
    fileUploadStatus: '',
    uploadedFileContent: {
        name: '',
        creationTime: '',
        filePath: '',
        lastModificationTime: '',
        id: null,
    },
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
        default:
            return state;
    }
};

export default advertisingManagementReducer;
