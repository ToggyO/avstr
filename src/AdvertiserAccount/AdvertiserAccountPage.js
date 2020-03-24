import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';
import { requestAdvertisements } from './advertising-management/action-creators';

import Advertisements from './advertising-management/components/Advertisements';


class AdvertiserAccountPage extends Component {
    componentDidMount() {
        const { requestAdvertisementsAction } = this.props;
        requestAdvertisementsAction();
    }

    handleAddBtn = () => {
        history.push('/advertiser/add');
    };

    render() {
        const { advertisements } = this.props;
        return (
            <Advertisements
                addBtnHandler={this.handleAddBtn}
                advertisements={advertisements}
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
};

const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: { advertisements },
    },
}) => ({ advertisements });

const mapDispatchToProps = {
    requestAdvertisementsAction: requestAdvertisements,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertiserAccountPage);
