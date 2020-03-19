import {
    UPLOAD_FILE,
    CHANGE_UPLOAD_STATUS,
} from './actions';


export const uploadFile = (data) => ({
    type: UPLOAD_FILE,
    data,
});

export const changeUploadStatus = (data) => ({
    type: CHANGE_UPLOAD_STATUS,
    data,
});
