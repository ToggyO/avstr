import React from 'react';
// import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import styles from './index.module.scss';

const points = [
    {
        title: 'Placemark 1',
        descr: 'Some description',
        coords: [55.831903, 37.411961],
    },
    {
        title: 'Placemark 2',
        descr: 'Some description',
        coords: [55.763338, 37.565466],
    },
    {
        title: 'Placemark 3',
        descr: 'Some description',
        coords: [55.763338, 37.565466],
    },
    {
        title: 'Placemark 4',
        descr: 'Some description',
        coords: [55.744522, 37.616378],
    },
    {
        title: 'Placemark 5',
        descr: 'Some description',
        coords: [55.780898, 37.642889],
    },
    {
        title: 'Placemark 6',
        descr: 'Some description',
        coords: [55.793559, 37.435983],
    },
    {
        title: 'Placemark 7',
        descr: 'Some description',
        coords: [55.800584, 37.675638],
    },
    {
        title: 'Placemark 8',
        descr: 'Some description',
        coords: [55.716733, 37.589988],
    },
];

const mapState = {
    center: [55.751574, 37.573856],
    zoom: 12,
};

class ComponentMap extends React.Component {
    constructor() {
        super();

        this.state = {
            balloonLayoutTemplate: null,
            balloonContentTemplate: null,
        };
    }

    createTemplateLayoutFactory = (ymaps) => {
        const { balloonContentTemplate, balloonLayoutTemplate } = this.state;

        if (ymaps && !balloonContentTemplate && !balloonLayoutTemplate) {
            this.setState({
                balloonLayoutTemplate: ymaps.templateLayoutFactory.createClass(
                    `<div class="popover top">
                        <a class="close" href="#">&times;</a>
                        <div class="popover-inner">
                            $[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]
                        </div>
                    </div>`,
                ),
                balloonContentTemplate: ymaps.templateLayoutFactory.createClass(
                    '<h3>Hello from custom template!</h3>',
                ),
            });
        }
    };

    render() {
        const { balloonContentTemplate, balloonLayoutTemplate } = this.state;

        return (
            <div className={styles.wrap}>
                <YMaps>
                    <Map
                        onLoad={this.createTemplateLayoutFactory}
                        defaultState={mapState}
                        options={{ suppressMapOpenBlock: true }}
                        width="100%"
                        height="100%"
                        modules={['templateLayoutFactory']}
                    >
                        {points.map((point) => (
                            balloonContentTemplate && balloonLayoutTemplate && (
                                <Placemark
                                    key={point.title}
                                    geometry={point.coords}
                                    options={{
                                        iconLayout: 'default#image',
                                        iconImageHref: `${process.env.PUBLIC_URL}/placemark.svg`,
                                        iconImageSize: [22, 22],
                                        balloonLayout: balloonLayoutTemplate,
                                        balloonContentLayout: balloonContentTemplate,
                                        balloonShadow: false,
                                        balloonPanelMaxMapArea: 0,
                                    }}
                                    modules={['geoObject.addon.balloon']}
                                />
                            )
                        ))}
                    </Map>
                </YMaps>
            </div>
        );
    }
}

ComponentMap.propTypes = {

};

export default ComponentMap;
