import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

// import { YMaps, Map as YaMap } from 'react-yandex-maps';

import yaMaps from 'ymaps';

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
    componentDidMount() {
        this.loadYaMap();
    }

    setMapInstanceRef = (ref) => {
        this.map = ref;
    };

    loadYaMap = () => {
        // const { geoPoints } = this.props;

        console.log(yaMaps);

        yaMaps
            .load()
            .then((ymaps) => {
                const map = new ymaps.Map(
                    'yaMap',
                    mapState, {
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                    },
                );

                console.log(map);
            })
            .catch((error) => console.log('Failed to load Yandex Maps', error));

        /* if (ymaps && geoPoints.length) {
            this.ymaps = ymaps;

            // this.initCollection();
        } */
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
    };

    initCollection = () => {
        const { map } = this;

        this.createCollection();
        map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
        });
    };

    render() {
        const { wrapClassName } = this.props;

        /* <div className={cn(styles.wrap, wrapClassName)}>
                <YMaps query={{ load: 'package.full' }}>
                    <YaMap
                        onLoad={this.loadYaMap}
                        defaultState={mapState}
                        options={{ suppressMapOpenBlock: true }}
                        width={mapWidth}
                        height={mapHeight}
                        modules={['templateLayoutFactory']}
                        instanceRef={this.setMapInstanceRef}
                    />
                </YMaps>
            </div> */

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
