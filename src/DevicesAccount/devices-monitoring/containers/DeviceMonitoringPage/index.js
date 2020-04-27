import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { connect } from 'react-redux';

import Button from 'Core/common/Button';
import Map from 'Core/common/Map';
import DeviceMonitoringCardContainer from '../DeviceMonitoringCardContainer';
import DeviceMonitoringVideoContainer from '../../components/DeviceMonitoringVideo';

import { startMediaStream } from '../../action-creators';

import styles from './index.module.scss';


class DeviceMonitoringPage extends Component {
    handleShowTranslationClick = () => {
        const {
            serialNumber,
            id,
            startMediaStreamAction,
        } = this.props;

        startMediaStreamAction({
            serialNumber,
            id,
        });
    };

    render() {
        const {
            showMediaStreamLoader,
            mediaStreamId,
            isActive,
            isRevokeRequired,
        } = this.props;
        return (
            <div className={styles.wrap}>
                <DeviceMonitoringCardContainer />
                <div className={styles.mediaWrap}>
                    <Map
                        mapHeight={mediaStreamId ? '50%' : '100%'}
                        wrapClassName={mediaStreamId
                            ? cn(styles.map, styles.map__splitted)
                            : styles.map}
                        geoPoints={[]}
                    />

                    {mediaStreamId
                        ? (
                            <div className={styles.videoWrap}>
                                <DeviceMonitoringVideoContainer mediaStreamId={mediaStreamId} />
                            </div>
                        )
                        : (
                            isActive && !isRevokeRequired
                            && (
                                <Button
                                    className={styles.btn}
                                    type="dark"
                                    onClick={this.handleShowTranslationClick}
                                >
                                    {showMediaStreamLoader
                                        ? 'Начинается трансляция...'
                                        : 'Смотреть видеотрансляцию'}
                                </Button>
                            )
                        )}
                </div>
            </div>
        );
    }
}


DeviceMonitoringPage.defaultProps = {
    mediaStreamId: null,
    id: null,
};

DeviceMonitoringPage.propTypes = {
    serialNumber: PropTypes.string.isRequired,
    id: PropTypes.number,
    isActive: PropTypes.bool.isRequired,
    isRevokeRequired: PropTypes.bool.isRequired,
    startMediaStreamAction: PropTypes.func.isRequired,
    mediaStreamId: PropTypes.number,
    showMediaStreamLoader: PropTypes.bool.isRequired,
};


const mapStateToProps = ({
    devicesReducer: {
        devicesMonitoringReducer: {
            currentDevice: {
                serialNumber,
                id,
                isActive,
                isRevokeRequired,
            },
            mediaStreamId,
            showMediaStreamLoader,
        },
    },
}) => ({
    serialNumber,
    id,
    isActive,
    isRevokeRequired,
    mediaStreamId,
    showMediaStreamLoader,
});

const mapDispatchToProps = {
    startMediaStreamAction: startMediaStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringPage);
