import {
    UPLOAD_FILE,
    CHANGE_UPLOAD_STATUS,
    RECEIVE_UPLOADED_CONTENT,
    SAVE_XHR,
    CLEAN_XHR,
    REQUEST_ADVERTISEMENTS,
    RECEIVE_ADVERTISEMENTS,
    DELETE_ADVERTISEMENT,
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
export const saveXhr = (data) => ({
    type: SAVE_XHR,
    data,
});
export const cleanXhr = (data) => ({
    type: CLEAN_XHR,
    data,
});


export const requestAdvertisements = () => ({
    type: REQUEST_ADVERTISEMENTS,
});

export const receiveAdvertisements = (data) => ({
    type: RECEIVE_ADVERTISEMENTS,
    data,
});

export const deleteAdvertisement = (data) => ({
    type: DELETE_ADVERTISEMENT,
    data,
});
