import React from 'react';
import PropTypes from 'prop-types';


const DeviceItem = ({
    content: {
        name,
        serialNumber,
        isActive,
    },
    number,
}) => (
    <tr>
        <td>{number}</td>
        <td>{name}</td>
        <td>{serialNumber}</td>
        <td>{isActive && 'active'}</td>
    </tr>
);


DeviceItem.propTypes = {
    content: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        serialNumber: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
    }).isRequired,
    number: PropTypes.number.isRequired,
};

export default DeviceItem;
