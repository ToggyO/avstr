import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from 'Core/common/Button';
import Map from 'Core/common/Map';
import DeviceMonitoringCard from '../DeviceMonitoringCard';

import styles from './index.module.scss';


const DeviceMonitoringPage = () => {
    const [showTranslation, setShowTranslation] = useState(false);
    const handleShowTranslationClick = () => {
        setShowTranslation(true);
    };

    return (
        <div className={styles.wrap}>
            <DeviceMonitoringCard />
            <div className={styles.mediaWrap}>
                <Map
                    mapHeight={showTranslation ? '50%' : '100%'}
                    wrapClassName={showTranslation
                        ? cn(styles.map, styles.map__splitted)
                        : styles.map}
                    geoPoints={[]}
                />

                {showTranslation
                    ? (
                        <div className={styles.videoWrap}>
                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                            <video className={styles.video} />
                        </div>
                    )
                    : (
                        <Button
                            className={styles.btn}
                            type="dark"
                            onClick={handleShowTranslationClick}
                        >
                            Смотреть видеотрансляцию
                        </Button>
                    )}
            </div>
        </div>
    );
};


DeviceMonitoringPage.propTypes = {
    //
};

export default DeviceMonitoringPage;
