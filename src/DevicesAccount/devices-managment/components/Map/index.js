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

        /* this.state = {
            balloonActive: {},
        }; */

        this.ymaps = null;
    }

    componentDidUpdate(prevProps) {
        const { geoPoints } = this.props;

        if (!isEqual(geoPoints, prevProps.geoPoints) && prevProps.geoPoints.length) {
            console.log('prevProps', prevProps);
            // this.updateCollection();
        }
    }

    setMapInstanceRef = (ref) => {
        this.map = ref;
    };

    loadYaMap = (ymaps) => {
        const { geoPoints } = this.props;

        console.log('ymaps', ymaps);
        console.log('geoPoints', geoPoints);

        if (ymaps && geoPoints.length) {
            this.ymaps = ymaps;

            this.initCollection();
        }
    };

    createCollection = () => {
        const { map, ymaps } = this;
        const { geoPoints } = this.props;
        // const { balloonActive } = this.state;

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

        /* map.geoObjects.each((geoObject) => {

        }); */

        // map.balloon.open(map.getCenter());

        /* console.log(Object.keys(balloonActive).length === 0 && balloonActive.constructor === Object); */

        /* if (this.state.balloonActive) {
            this.state.balloonActive.open();
        } */
    };

    initCollection = () => {
        const { map } = this;

        this.createCollection();
        map.setBounds(map.geoObjects.getBounds());
    };

    updateCollection = () => {
        const { map } = this;

        // console.log(map.balloon.isOpen());

        if (map.balloon.isOpen()) {
            // console.log(map.balloon.getData());

            /* this.setState({
                balloonActive: map.balloon.getData(),
            }); */

            // map.balloon.getData().open();
        }

        map.geoObjects.removeAll();
        this.createCollection();
    };

    render() {
        return (
            <div className={styles.wrap}>
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
