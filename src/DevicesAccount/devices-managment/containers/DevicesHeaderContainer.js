import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';

import DevicesHeader from '../components/DevicesHeader';
import { requestDevices } from '../action-creators';

class DevicesHeaderContainer extends Component {
    componentDidMount() {
        const { requestDevicesAction } = this.props;
        requestDevicesAction();
    }

    handleAddBtn = () => {
        history.push('/devices/add');
    };

    handleMapBtn = () => {
        history.push('/devices/main/map');
    };

    handleListBtn = () => {
        history.push('/devices/main/list');
    };

    render() {
        const { devices } = this.props;
        return (
            <DevicesHeader
                text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
                handleAddBtn={this.handleAddBtn}
                handleMapBtn={this.handleMapBtn}
                handleListBtn={this.handleListBtn}
            />
        );
    }
}

DevicesHeaderContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DevicesHeaderContainer);
