import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { requestDevices } from '../action-creators';


import Devices from '../components/Devices';


class DevicesListPage extends Component {
    componentDidMount() {
        const { requestDevicesAction } = this.props;
        requestDevicesAction();
    }

    render() {
        const { devices } = this.props;
        return (
            <Devices
                devices={devices}
                addBtnHandler={this.handleAddBtn}
                mapBtnHandler={this.handleMapBtn}
                handleListBtn={this.handleListBtn}
            />
        );
    }
}


DevicesListPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DevicesListPage);
