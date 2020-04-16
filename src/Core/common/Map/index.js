import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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


const Map = ({
    geoPoints,
    wrapClassName,
    mapWidth,
    mapHeight,
}) => {
    let map = null;

    const setMapInstanceRef = (ref) => {
        map = ref;
    };

    const createCollection = (ymaps) => {
        if (ymaps && geoPoints.length) {
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

            map.setBounds(map.geoObjects.getBounds(), {
                checkZoomRange: true,
            });
        }
    };

    return (
        <div className={cn(styles.wrap, wrapClassName)}>
            <YMaps query={{ load: 'package.full' }}>
                <YaMap
                    onLoad={createCollection}
                    defaultState={mapState}
                    options={{
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true,
                    }}
                    width={mapWidth}
                    height={mapHeight}
                    modules={['templateLayoutFactory']}
                    instanceRef={setMapInstanceRef}
                />
            </YMaps>
        </div>
    );
};


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
