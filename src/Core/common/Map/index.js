import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { YMaps, Map as YaMap } from 'react-yandex-maps';

import isEqual from 'Core/utils/isEqual';

import {
    createBalloonLayoutTemplate,
    createPlaceMark,
    createBalloonContentTemplate,
} from './mapExtensions';

import styles from './index.module.scss';

const mapState = {
    center: [55.751574, 37.573856],
    zoom: 11,
    controls: [],
};

class Map extends Component {
    constructor(props) {
        super(props);

        this.ymaps = null;
        this.balloonIsActive = false;
        this.balloonIndex = false;
    }

    componentDidUpdate(prevProps) {
        const { geoPoints } = this.props;

        if (!isEqual(geoPoints, prevProps.geoPoints) && prevProps.geoPoints.length) {
            this.updateCollection();
        }
    }

    setMapInstanceRef = (ref) => {
        this.map = ref;
    };

    loadYaMap = (ymaps) => {
        const { geoPoints } = this.props;

        if (ymaps && geoPoints.length) {
            this.ymaps = ymaps;

            this.initCollection();
        }
    };

    createCollection = () => {
        const { map, ymaps } = this;
        const { geoPoints } = this.props;
        let placeMarks = [];

        geoPoints.forEach((point, index) => {
            const { descr } = point;
            const collection = new ymaps.GeoObjectCollection(null, { preset: descr });
            const placeMark = createPlaceMark(
                ymaps,
                point,
                createBalloonLayoutTemplate(ymaps),
                createBalloonContentTemplate(ymaps, point),
            );

            placeMarks = [...placeMarks, placeMark];

            map.geoObjects.add(collection);
            collection.add(placeMark);

            placeMark.events.add('balloonopen', () => {
                this.balloonIndex = index;
            });
        });

        if (this.balloonIsActive) {
            placeMarks[this.balloonIndex].balloon.open();
        }
    };

    initCollection = () => {
        const { map } = this;

        this.createCollection();
        map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
        });
    };

    updateCollection = () => {
        const { map } = this;

        this.balloonIsActive = map.balloon.isOpen();
        map.geoObjects.removeAll();
        this.createCollection();
    };

    render() {
        const { wrapClassName, mapWidth, mapHeight } = this.props;

        return (
            <div className={cn(styles.wrap, wrapClassName)}>
                <YMaps query={{ load: 'package.full' }}>
                    <YaMap
                        onLoad={this.loadYaMap}
                        defaultState={mapState}
                        options={{
                            suppressMapOpenBlock: true,
                            yandexMapDisablePoiInteractivity: true,
                        }}
                        width={mapWidth}
                        height={mapHeight}
                        modules={['templateLayoutFactory']}
                        instanceRef={this.setMapInstanceRef}
                    />
                </YMaps>
            </div>
        );
    }
}

Map.defaultProps = {
    wrapClassName: '',
    mapWidth: '100%',
    mapHeight: '100%',
};

Map.propTypes = {
    wrapClassName: PropTypes.string,
    mapWidth: PropTypes.string,
    mapHeight: PropTypes.string,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

export default Map;
