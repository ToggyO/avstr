import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { connect } from 'react-redux';
import streamStore from 'Core/streamStoreService';

import Button from 'Core/common/Button';
import DeviceMonitoringMapContainer from '../DeviceMonitoringMapContainer';
import DeviceMonitoringCardContainer from '../DeviceMonitoringCardContainer';
import DeviceMonitoringVideo from '../../components/DeviceMonitoringVideo';

import {
    startMediaStream,
    cancelMediaStream,
    changeMediaStreamLoader,
    cleanMediaStreamId,
} from '../../action-creators';

import styles from './index.module.scss';


class DeviceMonitoringPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMapSizeChanged: false,
        };
    }

    componentWillUnmount() {
        this.closeTranslation();
    }

    handleCloseVideoBtnClick = () => {
        this.closeTranslation();
        this.updateMapSize();
    };

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
        this.updateMapSize();
    };

    closeTranslation = () => {
        const {
            cancelMediaStreamAction,
            mediaStreamId,
            cleanMediaStreamIdAction,
            changeMediaStreamLoaderAction,
        } = this.props;
        cancelMediaStreamAction();

        const connection = streamStore.getConnection(mediaStreamId);
        if (connection) {
            connection.closeSocket();
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        }

        cleanMediaStreamIdAction();
        streamStore.clean();
        changeMediaStreamLoaderAction(false);
    };

    updateMapSize = () => {
        this.setState({
            isMapSizeChanged: false,
        }, () => {
            this.setState({
                isMapSizeChanged: true,
            });
        });
    };

    render() {
        const { isMapSizeChanged } = this.state;
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
                    <DeviceMonitoringMapContainer
                        isSizeChanged={isMapSizeChanged}
                        className={mediaStreamId
                            ? cn(styles.map, styles.map__splitted)
                            : styles.map}
                        geoPoints={[]}
                    />

                    {mediaStreamId
                        ? (
                            <div className={styles.videoWrap}>
                                <Button
                                    size="small"
                                    className={styles.closeVideoBtn}
                                    onClick={this.handleCloseVideoBtnClick}
                                >
                                    х
                                </Button>
                                <DeviceMonitoringVideo mediaStreamId={mediaStreamId} />
                            </div>
                        )
                        : (
                            isActive && !isRevokeRequired
                            && (
                                <Button
                                    disabled={showMediaStreamLoader}
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
    cancelMediaStreamAction: PropTypes.func.isRequired,
    changeMediaStreamLoaderAction: PropTypes.func.isRequired,
    cleanMediaStreamIdAction: PropTypes.func.isRequired,
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
    cancelMediaStreamAction: cancelMediaStream,
    changeMediaStreamLoaderAction: changeMediaStreamLoader,
    cleanMediaStreamIdAction: cleanMediaStreamId,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMonitoringPage);
