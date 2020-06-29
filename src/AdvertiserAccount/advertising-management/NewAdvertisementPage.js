import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewAdvertisement from './components/NewAdvertisement';

import {
    changeUploadStatus,
    uploadFile,
    cleanXhr,
    getAdvertisersList,
    resetAdvertisersList,
} from './action-creators';

const NewAdvertisementPage = ({
    fileUploadStatus,
    uploadedFileContent,
    uploadFileAction,
    changeUploadStatusAction,
    xhr,
    cleanXhrAction,
    loading,
    getAdvertisersListAction,
    resetAdvertisersListAction,
    advertisersPending,
    advertisers,
}) => (
    <NewAdvertisement
        fileStatus={fileUploadStatus}
        content={uploadedFileContent}
        saveClick={uploadFileAction}
        changeFileStatus={changeUploadStatusAction}
        uploadingConnection={xhr}
        cleanUploadConnection={cleanXhrAction}
        loading={loading}
        advertiserSearch={getAdvertisersListAction}
        advertisersReset={resetAdvertisersListAction}
        advertisersPending={advertisersPending}
        advertisers={advertisers}
    />
);


NewAdvertisementPage.defaultProps = {
    xhr: null,
    loading: false,
    advertisers: [],
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
    getAdvertisersListAction: PropTypes.func.isRequired,
    resetAdvertisersListAction: PropTypes.func.isRequired,
    advertisersPending: PropTypes.bool.isRequired,
    advertisers: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        organization: PropTypes.string.isRequired,
    })),
};


const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: {
            fileUploadStatus,
            uploadedFileContent,
            xhr,
            loading,
            advertisersPending,
            advertisers,
        },
    },
}) => ({
    fileUploadStatus,
    uploadedFileContent,
    xhr,
    loading,
    advertisersPending,
    advertisers,
});

const mapDispatchToProps = {
    uploadFileAction: uploadFile,
    changeUploadStatusAction: changeUploadStatus,
    cleanXhrAction: cleanXhr,
    getAdvertisersListAction: getAdvertisersList,
    resetAdvertisersListAction: resetAdvertisersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementPage);
