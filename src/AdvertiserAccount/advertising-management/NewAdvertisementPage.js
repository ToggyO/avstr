import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewAdvertisement from './components/NewAdvertisement';

import { changeUploadStatus, uploadFile, cleanXhr } from './action-creators';


const NewAdvertisementPage = ({
    fileUploadStatus,
    uploadedFileContent,
    uploadFileAction,
    changeUploadStatusAction,
    xhr,
    cleanXhrAction,
    loading,
}) => (
    <NewAdvertisement
        fileStatus={fileUploadStatus}
        content={uploadedFileContent}
        saveClick={uploadFileAction}
        changeFileStatus={changeUploadStatusAction}
        uploadingConnection={xhr}
        cleanUploadConnection={cleanXhrAction}
        loading={loading}
    />
);


NewAdvertisementPage.defaultProps = {
    xhr: null,
    loading: false,
};

NewAdvertisementPage.propTypes = {
    fileUploadStatus: PropTypes.string.isRequired,
    uploadedFileContent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        lastModificationTime: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    uploadFileAction: PropTypes.func.isRequired,
    changeUploadStatusAction: PropTypes.func.isRequired,
    xhr: PropTypes.shape(),
    cleanXhrAction: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};


const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: {
            fileUploadStatus,
            uploadedFileContent,
            xhr,
            loading,
        },
    },
}) => ({
    fileUploadStatus,
    uploadedFileContent,
    xhr,
    loading,
});

const mapDispatchToProps = {
    uploadFileAction: uploadFile,
    changeUploadStatusAction: changeUploadStatus,
    cleanXhrAction: cleanXhr,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementPage);
