import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import yaMaps from 'ymaps';

import isEqual from 'Core/utils/isEqual';

import {
    createBalloonLayoutTemplate,
    createPlaceMark,
    createBalloonContentTemplate,
    setMapCenter,
    defaultCenter,
} from './mapExtensions';

import styles from './index.module.scss';

const mapOptions = {
    center: defaultCenter,
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
        this.balloonIndex = null;
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
            this.initPoints();
            this.isFirstUpdate = false;
        }

        if (isSizeChanged) {
            map.container.fitToViewport();
        }

        if (prevProps.geoPoints.length && !isEqual(geoPoints, prevProps.geoPoints)) {
            this.updatePoints();
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

                const { handleMapLoaded } = this.props;
                handleMapLoaded(true);
            })
            .catch((error) => {
                console.log('Failed to load Yandex Maps', error);
            });
    };

    // createPoints = (point) => {
    //     debugger
    //     const { map } = this.state;
    //     const { ymaps } = this;
    //     let placeMarks = [];
    //
    //     const { descr, deviceId } = point;
    //     const { pointsWithBaloons } = this.props;
    //     const collection = new ymaps.GeoObjectCollection(null, { preset: descr });
    //
    //     const placeMark = createPlaceMark(
    //         ymaps,
    //         map,
    //         point,
    //         pointsWithBaloons && createBalloonLayoutTemplate(ymaps),
    //         pointsWithBaloons && createBalloonContentTemplate(ymaps, point),
    //     );
    //     placeMark.id = deviceId;
    //
    //     placeMarks = [...placeMarks, placeMark];
    //
    //     map.geoObjects.add(collection);
    //     collection.add(placeMark);
    //
    //     if (pointsWithBaloons) {
    //         placeMark.events.add('balloonopen', () => {
    //             this.balloonIndex = deviceId;
    //         });
    //     }
    //
    //     if (this.balloonIsActive) {
    //         const openedPlaceMark = placeMarks.filter(({ id }) => id === this.balloonIndex)[0];
    //         openedPlaceMark.balloon.open();
    //     }
    // };

    createPoints = () => {
        const { map } = this.state;
        const { geoPoints, isCenteredByClick } = this.props;
        const { ymaps } = this;
        let placeMarks = [];

        geoPoints.forEach((point) => {
            const { descr, deviceId } = point;
            const { pointsWithBaloons } = this.props;
            const collection = new ymaps.GeoObjectCollection(null, { preset: descr });

            const placeMark = createPlaceMark(
                ymaps,
                map,
                point,
                isCenteredByClick,
                pointsWithBaloons && createBalloonLayoutTemplate(ymaps),
                pointsWithBaloons && createBalloonContentTemplate(ymaps, point),
            );
            placeMark.id = deviceId;

            placeMarks = [...placeMarks, placeMark];

            map.geoObjects.add(collection);
            collection.add(placeMark);

            if (pointsWithBaloons) {
                placeMark.events.add('balloonopen', () => {
                    this.balloonIndex = deviceId;
                });
            }
        });

        if (this.balloonIsActive) {
            const openedPlaceMark = placeMarks.filter(({ id }) => id === this.balloonIndex)[0];
            openedPlaceMark.balloon.open();
        }
    };

    initPoints = () => {
        const { map } = this.state;

        this.createPoints();

        const bounds = map.geoObjects.getBounds();

        if (bounds) {
            map.setBounds(bounds, {
                checkZoomRange: true,
            });
        }
    };

    updatePoints = () => {
        const { map } = this.state;

        this.balloonIsActive = map.balloon.isOpen();
        map.geoObjects.removeAll();

        this.createPoints();

        const { setCenterWithUpdate } = this.props;
        if (setCenterWithUpdate) {
            setMapCenter(map, map.geoObjects.getBounds()[0]);
        }
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
    setCenterWithUpdate: false,
    isCenteredByClick: true,
};

Map.propTypes = {
    className: PropTypes.string,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            descr: PropTypes.string,
            coords: PropTypes.arrayOf(PropTypes.number),
        }),
    ).isRequired,
    isSizeChanged: PropTypes.bool,
    handleMapLoaded: PropTypes.func.isRequired,
    pointsWithBaloons: PropTypes.bool.isRequired,
    setCenterWithUpdate: PropTypes.bool,
    isCenteredByClick: PropTypes.bool,
};

export default Map;
