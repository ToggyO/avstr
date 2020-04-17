import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import yaMaps from 'ymaps';

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

        this.map = null;
        this.ymaps = null;
        this.balloonIsActive = false;
        this.balloonIndex = false;
    }

    componentDidUpdate(prevProps) {
        const { geoPoints } = this.props;

        if (!prevProps.geoPoints.length) {
            this.loadYaMap();
        }

        if (prevProps.geoPoints.length && !isEqual(geoPoints, prevProps.geoPoints)) {
            this.updateCollection();
        }
    }

    loadYaMap = () => {
        const { geoPoints } = this.props;

        yaMaps
            .load()
            .then((ymaps) => {
                this.ymaps = ymaps;
                this.map = new ymaps.Map(
                    'yaMap',
                    mapState, {
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                    },
                );

                if (geoPoints.length) {
                    this.initCollection();
                }
            })
            .catch((error) => {
                console.log('Failed to load Yandex Maps', error);
            });
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
        const {
            wrapClassName,
            // mapWidth,
            // mapHeight,
        } = this.props;

        return (
            <div id="yaMap" className={cn(styles.wrap, wrapClassName)} />
        );
    }
}

Map.defaultProps = {
    wrapClassName: '',
    // mapWidth: '100%',
    // mapHeight: '100%',
};

Map.propTypes = {
    wrapClassName: PropTypes.string,
    // mapWidth: PropTypes.string,
    // mapHeight: PropTypes.string,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

export default Map;
