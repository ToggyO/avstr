import React, { Component, memo } from 'react';
import PropTypes from 'prop-types';
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
    }

    componentDidUpdate(prevProps) {
        const { geoPoints } = this.props;

        if (!isEqual(geoPoints, prevProps.geoPoints) && prevProps.geoPoints.length > 0) {
            console.log('prevProps', prevProps);
            this.updateCollection();
        }
    }

    setMapInstanceRef = (ref) => {
        this.map = ref;
    };

    loadYaMap = (ymaps) => {
        if (ymaps) {
            this.ymaps = ymaps;

            this.initCollection();
        }
    };

    createCollection = () => {
        const { map, ymaps } = this;
        const { geoPoints } = this.props;

        geoPoints.forEach((point) => {
            const { descr } = point;
            const collection = new ymaps.GeoObjectCollection(null, { preset: descr });
            const placeMark = createPlaceMark(
                ymaps,
                point,
                createBalloonLayoutTemplate(ymaps),
                createBalloonContentTemplate(ymaps, point),
            );

            map.geoObjects.add(collection);
            collection.add(placeMark);
        });

        // const openBalloon = map.balloon.getData();

        // openBalloon.open();

        /* map.geoObjects.each((geoObject) => {

        }); */
        // console.log(placeMark);

        // map.balloon.open(geoPoints[0].coords);

        // map.balloon.open(map.getCenter());
    };

    initCollection = () => {
        const { map } = this;

        this.createCollection();
        map.setBounds(map.geoObjects.getBounds());
    };

    updateCollection = () => {
        const { map } = this;

        console.log(map.balloon.isOpen());

        map.geoObjects.removeAll();
        this.createCollection();
    };

    render() {
        return (
            <div className={styles.wrap}>
                <div id="yaMap" />
                <YMaps query={{ load: 'package.full' }}>
                    <YaMap
                        onLoad={this.loadYaMap}
                        defaultState={mapState}
                        options={{ suppressMapOpenBlock: true }}
                        width="100%"
                        height="100%"
                        modules={['templateLayoutFactory']}
                        instanceRef={this.setMapInstanceRef}
                    />
                </YMaps>
            </div>
        );
    }
}

Map.propTypes = {
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

export default memo(Map, ({ geoPoints }, nextProps) => (
    isEqual(geoPoints, nextProps.geoPoints)
));
