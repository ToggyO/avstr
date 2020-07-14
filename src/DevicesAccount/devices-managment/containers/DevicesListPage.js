import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Container from 'Core/common/Container';

import { requestDevices } from '../action-creators';
import DevicesList from '../components/DevicesList';

class DevicesListPage extends Component {
    componentDidMount() {
        const { requestDevicesAction } = this.props;
        requestDevicesAction();
    }

    render() {
        const {
            pagination,
            devices,
            requestDevicesAction,
            loading,
        } = this.props;

        return (
            <Container>
                <DevicesList
                    pagination={pagination}
                    devices={devices}
                    requestDevices={requestDevicesAction}
                    loading={loading}
                />
            </Container>
        );
    }
}

DevicesListPage.propTypes = {
    pagination: PropTypes.shape({
        page: PropTypes.number,
        total: PropTypes.number,
        size: PropTypes.number,
        hasPrevious: PropTypes.bool,
        hasNext: PropTypes.bool,
    }).isRequired,
    devices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            serialNumber: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            isRevokeRequired: PropTypes.bool,
        }),
    ).isRequired,
    requestDevicesAction: PropTypes.func.isRequired,
    loading: PropTypes.bool,
};

DevicesListPage.defaultProps = {
    loading: false,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            pagination,
            devices,
            loading,
        },
    },
}) => ({ pagination, devices, loading });

const mapDispatchToProps = {
    requestDevicesAction: requestDevices,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesListPage);
