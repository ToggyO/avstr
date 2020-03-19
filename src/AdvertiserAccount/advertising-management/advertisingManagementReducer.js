import { CHANGE_UPLOAD_STATUS } from './actions';

const initialState = {
    fileUploadStatus: '',
};

const advertisingManagementReducer = (state = { ...initialState }, { type, data }) => {
    switch (type) {
        case CHANGE_UPLOAD_STATUS:
            return {
                ...state,
                fileUploadStatus: data,
            };
        default:
            return state;
    }
};

export default advertisingManagementReducer;
