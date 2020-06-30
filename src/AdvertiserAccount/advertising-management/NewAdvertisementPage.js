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
    clearAdvertiserManagerErrors,
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
    errorsFromBackend,
    cleanErrors,
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
        errorsFromBackend={errorsFromBackend}
        cleanErrors={cleanErrors}
    />
);


NewAdvertisementPage.defaultProps = {
    xhr: null,
    loading: false,
    advertisers: [],
    errorsFromBackend: {},
    cleanErrors: Function.prototype,
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
    errorsFromBackend: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    cleanErrors: PropTypes.func,
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
            errors,
        },
    },
}) => ({
    fileUploadStatus,
    uploadedFileContent,
    xhr,
    loading,
    advertisersPending,
    advertisers,
    errorsFromBackend: errors,
});

const mapDispatchToProps = {
    uploadFileAction: uploadFile,
    changeUploadStatusAction: changeUploadStatus,
    cleanXhrAction: cleanXhr,
    getAdvertisersListAction: getAdvertisersList,
    resetAdvertisersListAction: resetAdvertisersList,
    cleanErrors: clearAdvertiserManagerErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementPage);
