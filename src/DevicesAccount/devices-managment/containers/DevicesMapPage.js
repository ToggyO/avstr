import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Map from '../components/Map';
import { requestGeoPoints } from '../action-creators';

/* const points = [
    {
        title: 'Placemark 1',
        descr: 'fsgektultje',
        coords: [55.831903, 37.411961],
    },
    {
        title: 'Placemark 2',
        descr: '5we5hwehwehQwe',
        coords: [55.763338, 37.565466],
    },
    {
        title: 'Placemark 4',
        descr: 'Somewegwgweg',
        coords: [55.744522, 37.616378],
    },
];

const points3 = [
    {
        title: 'Placemark 1',
        descr: 'fsgektultje',
        coords: [55.831903, 37.411961],
    },
    {
        title: 'Placemark 2',
        descr: '5we5hwehwehQwe',
        coords: [55.763338, 37.565466],
    },
    {
        title: 'Placemark 4',
        descr: 'Somewegwgweg',
        coords: [55.744522, 37.616378],
    },
];

const points2 = [
    {
        title: 'Placemark 7',
        descr: 'Som874984gwe',
        coords: [55.800584, 37.675638],
    },
    {
        title: 'Placemark 8',
        descr: 'heh56description',
        coords: [55.716733, 37.589988],
    },
    {
        title: 'Placemark 8',
        descr: '54rherhon',
        coords: [55.716733, 38.589988],
    },
]; */

class DevicesMapPage extends Component {
    /* constructor(props) {
        super(props);
        this.state = {
            points: [],
        };
    } */

    componentDidMount() {
        const { requestGeoPointsAction } = this.props;

        /* this.setState({
            points: points,
        }); */

        requestGeoPointsAction();

        this.timer = setInterval(
            () => this.updateGeoPoints(),
            5000,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /* handleUpdate = () => {
        this.setState({
            points: points2,
        });
    }; */

    updateGeoPoints = () => {
        const { requestGeoPointsAction } = this.props;

        console.log(123);

        /* this.setState({
            points: points2,
        }); */

        requestGeoPointsAction();
    };

    render() {
        const { geoPoints } = this.props;

        return (
            <div>
                {geoPoints.length
                    ? (
                        <Map geoPoints={geoPoints} />
                    )
                    : null}
            </div>
        );
    }
}

DevicesMapPage.propTypes = {
    requestGeoPointsAction: PropTypes.func.isRequired,
    geoPoints: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            descr: PropTypes.string.isRequired,
            coords: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = ({
    devicesReducer: {
        devicesManagementReducer: {
            geoPoints,
        },
    },
}) => ({ geoPoints });

const mapDispatchToProps = {
    requestGeoPointsAction: requestGeoPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesMapPage);
