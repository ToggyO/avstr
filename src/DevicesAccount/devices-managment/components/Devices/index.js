import React from 'react';
import PropTypes from 'prop-types';


import Container from 'Core/common/Container';

import DevicesList from '../DevicesList';

const Devices = ({
    devices,
}) => (
    <Container>
        {devices.length
            ? (
                <DevicesList devices={devices} />
            )
            : ''}
    </Container>
);


Devices.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Devices;
