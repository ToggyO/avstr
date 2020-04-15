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
            activePlacemark: null,
        }; */

        this.ymaps = null;
    }

    componentDidUpdate(prevProps) {
        const { geoPoints } = this.props;

        if (!isEqual(geoPoints, prevProps.geoPoints) && prevProps.geoPoints.length) {
            console.log('prevProps', prevProps);
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
        // let activePlacemark = null;

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

            // console.log(balloonIsOpen);

            // placeMark.balloon.opne();

            placeMark.events.add('balloonopen', () => {
                // activePlacemark = placeMark;

                /* this.setState({
                    activePlacemark: placeMark,
                }); */
            });

            /* if (balloonIsOpen) {
                console.log(placeMark);

                placeMark.balloon.open();
            } */
        });

        /* if (balloonIsOpen) {
            map.balloon.open();
        } */

        /* if (this.state.activePlacemark) {
            console.log(this.state.activePlacemark);
            console.log(this.state.activePlacemark.balloon);
            this.state.activePlacemark.balloon.open();
        } */

        // console.log(this.state.activePlacemark);
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
        // const { balloonActive } = this.state;
        let balloonActive = false;

        if (map.balloon.isOpen()) {
            /* this.setState({
                balloonActive: 'wgweg',
            }); */

            balloonActive = true;

            // console.log('getPosition', map.balloon.getPosition());

            // map.balloon.getData().open();
        }

        map.geoObjects.removeAll();
        this.createCollection(balloonActive);

        /* if (balloonActive) {
            // const newBalloonActive = map.balloon.setData(balloonActive);

            // map.balloon.open([55.76164383333333, 49.16737066666666], balloonData, balloonOptions);
        } */
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
