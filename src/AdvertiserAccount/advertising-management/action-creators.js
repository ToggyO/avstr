import {
    UPLOAD_FILE,
    CHANGE_UPLOAD_STATUS,
    RECEIVE_UPLOADED_CONTENT,
    RECEIVE_ADVERTISEMENTS,
} from './actions';


export const uploadFile = (data) => ({
    type: UPLOAD_FILE,
    data,
});

export const changeUploadStatus = (data) => ({
    type: CHANGE_UPLOAD_STATUS,
    data,
});

export const receiveUploadedContent = (data) => ({
    type: RECEIVE_UPLOADED_CONTENT,
    data,
});


export const receiveAdvertisements = (data) => ({
    type: RECEIVE_ADVERTISEMENTS,
    data,
});
