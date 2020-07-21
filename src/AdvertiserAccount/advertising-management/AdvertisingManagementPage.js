import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from 'Core/history';
import { ROOT_ROUTES } from 'Core/constants';
import { requestAdvertisements, deleteAdvertisement } from './action-creators';

import Advertisements from './components/Advertisements';

class AdvertisingManagementPage extends Component {
    componentDidMount() {
        const { requestAdvertisementsAction } = this.props;
        requestAdvertisementsAction();
    }

    handleAddBtn = () => {
        history.push(`${ROOT_ROUTES.AD_MANAGER}/add`);
    };

    render() {
        const { advertisements, deleteAdvertisementAction, loading } = this.props;
        return (
            <Advertisements
                addBtnHandler={this.handleAddBtn}
                advertisements={advertisements}
                deleteAdvertisement={deleteAdvertisementAction}
                loading={loading}
            />
        );
    }
}

AdvertisingManagementPage.propTypes = {
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
    loading: PropTypes.bool,
};

AdvertisingManagementPage.defaultProps = {
    loading: false,
};

const mapStateToProps = ({
    advertiserAccountReducer: {
        advertisingManagementReducer: { advertisements, loading },
    },
}) => ({ advertisements, loading });

const mapDispatchToProps = {
    requestAdvertisementsAction: requestAdvertisements,
    deleteAdvertisementAction: deleteAdvertisement,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisingManagementPage);
