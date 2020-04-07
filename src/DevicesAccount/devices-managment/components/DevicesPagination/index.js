import React from 'react';
import PropTypes from 'prop-types';

const DevicesPagination = ({ pagination }) => {
    console.log(pagination);
    return (
        <div />
    );
};

DevicesPagination.propTypes = {
    pagination: PropTypes.shape().isRequired,
};

export default DevicesPagination;
