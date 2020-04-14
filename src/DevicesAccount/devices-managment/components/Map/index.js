import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map as YaMap } from 'react-yandex-maps';

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


const Map = ({ geoPoints }) => {
    let map = null;

    const setMapInstanceRef = (ref) => {
        map = ref;
    };

    const createCollection = (ymaps) => {
        if (ymaps && geoPoints.length > 0) {
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

            map.setBounds(map.geoObjects.getBounds());
        }
    };

    return (
        <div className={styles.wrap}>
            <YMaps query={{ load: 'package.full' }}>
                <YaMap
                    onLoad={createCollection}
                    defaultState={mapState}
                    options={{ suppressMapOpenBlock: true }}
                    width="100%"
                    height="100%"
                    modules={['templateLayoutFactory']}
                    instanceRef={setMapInstanceRef}
                />
            </YMaps>
        </div>
    );
};

Map.propTypes = {
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

export default Map;
