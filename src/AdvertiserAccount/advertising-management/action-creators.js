import * as actions from './actions';

export const uploadFile = (data) => ({
    type: actions.UPLOAD_FILE,
    data,
});
export const changeUploadStatus = (data) => ({
    type: actions.CHANGE_UPLOAD_STATUS,
    data,
});
export const receiveUploadedContent = (data) => ({
    type: actions.RECEIVE_UPLOADED_CONTENT,
    data,
});
export const saveXhr = (data) => ({
    type: actions.SAVE_XHR,
    data,
});
export const cleanXhr = (data) => ({
    type: actions.CLEAN_XHR,
    data,
});


export const requestAdvertisements = () => ({
    type: actions.REQUEST_ADVERTISEMENTS,
});

export const receiveAdvertisements = (data) => ({
    type: actions.RECEIVE_ADVERTISEMENTS,
    data,
});

export const deleteAdvertisement = (data) => ({
    type: actions.DELETE_ADVERTISEMENT,
    data,
});
