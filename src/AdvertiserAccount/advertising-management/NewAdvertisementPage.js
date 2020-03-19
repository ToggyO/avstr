import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewAdvertisement from './components/NewAdvertisement';

import { uploadFile } from './action-creators';


const NewAdvertisementPage = ({ fileUploadStatus, uploadFileAction }) => (
    <NewAdvertisement
        fileStatus={fileUploadStatus}
        saveClick={uploadFileAction}
    />
);


NewAdvertisementPage.propTypes = {
    fileUploadStatus: PropTypes.string.isRequired,
    uploadFileAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: { fileUploadStatus },
    },
}) => ({ fileUploadStatus });

const mapDispatchToProps = {
    uploadFileAction: uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertisementPage);
