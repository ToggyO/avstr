import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';
import { requestAdvertisements, deleteAdvertisement } from './advertising-management/action-creators';

import Advertisements from './advertising-management/components/Advertisements';


class AdvertiserAccountPage extends Component {
    componentDidMount() {
        const { requestAdvertisementsAction } = this.props;
        requestAdvertisementsAction();
        console.log('render container');
    }

    shouldComponentUpdate(nextProps) {
        const { advertisements } = this.props;
        console.log(JSON.stringify(advertisements));
        console.log(JSON.stringify(nextProps.advertisements));
        console.log(JSON.stringify(advertisements) === JSON.stringify(nextProps.advertisements));
        return nextProps.advertisements !== advertisements;
    }

    handleAddBtn = () => {
        history.push('/advertiser/add');
    };

    render() {
        const { advertisements, deleteAdvertisementAction } = this.props;
        return (
            <Advertisements
                addBtnHandler={this.handleAddBtn}
                advertisements={advertisements}
                deleteAdvertisement={deleteAdvertisementAction}
            />
        );
    }
}


AdvertiserAccountPage.propTypes = {
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            creationTime: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    ).isRequired,
    requestAdvertisementsAction: PropTypes.func.isRequired,
    deleteAdvertisementAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: { advertisements },
    },
}) => ({ advertisements });

const mapDispatchToProps = {
    requestAdvertisementsAction: requestAdvertisements,
    deleteAdvertisementAction: deleteAdvertisement,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertiserAccountPage);
