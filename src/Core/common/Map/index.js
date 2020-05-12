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

const mapOptions = {
    center: [55.751574, 37.573856],
    zoom: 11,
    controls: [],
};

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            map: null,
        };
        this.ymaps = null;
        this.balloonIsActive = false;
        this.balloonIndex = false;
        this.isFirstUpdate = true;
    }

    componentDidMount() {
        this.loadYaMap();
    }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) return;

        const { geoPoints, isSizeChanged } = this.props;
        const { map } = this.state;

        if (map && geoPoints.length && this.isFirstUpdate) {
            this.initCollection();
            this.isFirstUpdate = false;
        }

        if (isSizeChanged) {
            map.container.fitToViewport();
        }

        if (prevProps.geoPoints.length && !isEqual(geoPoints, prevProps.geoPoints)) {
            this.updateCollection();
        }
    }

    loadYaMap = () => {
        yaMaps
            .load()
            .then((ymaps) => {
                this.ymaps = ymaps;
                const map = new ymaps.Map(
                    'yaMap',
                    mapOptions, {
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                    },
                );
                this.setState({ map });
            })
            .catch((error) => {
                console.log('Failed to load Yandex Maps', error);
            });
    };

    createCollection = () => {
        const { map } = this.state;
        const { geoPoints } = this.props;
        const { ymaps } = this;
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
        const { map } = this.state;

        this.createCollection();
        map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
        });
    };

    updateCollection = () => {
        const { map } = this.state;

        this.balloonIsActive = map.balloon.isOpen();
        map.geoObjects.removeAll();
        this.createCollection();
    };

    render() {
        const { className } = this.props;

        return (
            <div
                id="yaMap"
                className={cn(styles.wrap, className)}
            />
        );
    }
}

Map.defaultProps = {
    className: '',
    isSizeChanged: false,
};

Map.propTypes = {
    className: PropTypes.string,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
    isSizeChanged: PropTypes.bool,
};

export default Map;
