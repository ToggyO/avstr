import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';

import { requestDevices } from './devices-managment/action-creators';


import Devices from './devices-managment/components/Devices';


class DevicesPage extends Component {
    componentDidMount() {
        const { requestDevicesAction } = this.props;
        requestDevicesAction();
    }

    handleAddBtn = () => {
        history.push('/devices/add');
    };

    render() {
        const { devices } = this.props;
        return (
            <Devices
                devices={devices}
                addBtnHandler={this.handleAddBtn}
            />
        );
    }
}


DevicesPage.propTypes = {
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    requestDevicesAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ devicesReducer: { devicesManagementReducer: { devices } } }) => ({ devices });

const mapDispatchToProps = {
    requestDevicesAction: requestDevices,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage);
