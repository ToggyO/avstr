import React from 'react';
// import PropTypes from 'prop-types';
import { YMaps, Map } from 'react-yandex-maps';

import {
    createBalloonLayoutTemplate,
    createPlaceMark,
    createBalloonContentTemplate,
} from './mapExtensions';

import styles from './index.module.scss';

const points = [
    {
        id: 1,
        title: 'Placemark 1',
        descr: 'Some description',
        coords: [55.831903, 37.411961],
    },
    {
        id: 2,
        title: 'Placemark 2',
        descr: 'Some description',
        coords: [55.763338, 37.565466],
    },
    {
        id: 3,
        title: 'Placemark 3',
        descr: 'Some description',
        coords: [55.763338, 37.565466],
    },
    {
        id: 4,
        title: 'Placemark 4',
        descr: 'Some description',
        coords: [55.744522, 37.616378],
    },
    {
        id: 5,
        title: 'Placemark 5',
        descr: 'Some description',
        coords: [55.780898, 37.642889],
    },
    {
        id: 6,
        title: 'Placemark 6',
        descr: 'Some description',
        coords: [55.793559, 37.435983],
    },
    {
        id: 7,
        title: 'Placemark 7',
        descr: 'Some description',
        coords: [55.800584, 37.675638],
    },
    {
        id: 8,
        title: 'Placemark 8',
        descr: 'Some description',
        coords: [55.716733, 37.589988],
    },
    {
        id: 9,
        title: 'Placemark 8',
        descr: 'Some description',
        coords: [55.716733, 38.589988],
    },
];

const mapState = {
    center: [55.751574, 37.573856],
    zoom: 11,
    controls: [],
};


const ComponentMap = () => {
    let map = null;

    const setMapInstanceRef = (ref) => {
        map = ref;
    };

    const createCollection = (ymaps) => {
        if (ymaps) {
            points.forEach((point) => {
                const collection = new ymaps.GeoObjectCollection(null, { preset: point.id });
                const placeMark = createPlaceMark(
                    ymaps,
                    point,
                    createBalloonLayoutTemplate(ymaps),
                    createBalloonContentTemplate(ymaps),
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
        <div className={styles.wrap}>
            <YMaps query={{ load: 'package.full' }}>
                <Map
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

ComponentMap.propTypes = {

};

export default ComponentMap;
