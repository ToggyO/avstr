import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewAdvertisement from './components/NewAdvertisement';

import { uploadFile } from './action-creators';


const NewAdvertisementPage = ({ fileUploadStatus, uploadedFileContent, uploadFileAction }) => (
    <NewAdvertisement
        fileStatus={fileUploadStatus}
        content={uploadedFileContent}
        saveClick={uploadFileAction}
    />
);


NewAdvertisementPage.propTypes = {
    fileUploadStatus: PropTypes.string.isRequired,
    uploadedFileContent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
        lastModificationTime: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    uploadFileAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: { fileUploadStatus, uploadedFileContent },
    },
}) => ({ fileUploadStatus, uploadedFileContent });

const mapDispatchToProps = {
    uploadFileAction: uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementPage);
