import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { startMediaStream } from '../action-creators';

class DeviceMonitoringVideoContainer extends Component {
    componentDidMount() {
        const { serialNumber, id, startMediaStreamAction } = this.props;
        // console.log(serialNumber, id);
        startMediaStreamAction({ serialNumber, id });
    }

    render() {
        // const { stream } = this.props;
        return (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
                autoPlay
                controls
            >
                <source
                    src="/2.mp4"
                    type="video/mp4"
                />
            </video>
        );
    }
}


DeviceMonitoringVideoContainer.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    startMediaStreamAction: PropTypes.func.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice: {
                serialNumber,
                id,
            },
            stream,
        },
    },
}) => ({
    serialNumber,
    id,
    stream,
});

const mapDispatchToProps = {
    startMediaStreamAction: startMediaStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringVideoContainer);
