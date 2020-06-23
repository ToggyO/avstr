import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getProp } from 'Core/utils/getProp';
import AdsListView from './AdsListView';
import * as actionCreators from '../action-creators';

const mapStateToProps = ({ advertiserAccountReducer }) => ({
    loading: getProp(advertiserAccountReducer, 'advertiserReducer.loading', false),
    pagination: getProp(advertiserAccountReducer, 'advertiserReducer.pagination', {}),
    advList: getProp(advertiserAccountReducer, 'advertiserReducer.items', []),
    errorsFromBackend: getProp(advertiserAccountReducer, 'advertiserReducer.errors', []),
});

const mapDispatchToProps = {
    getAdv: actionCreators.getAdvertisementsList,
    clearErrors: actionCreators.clearAdvertiserErrors,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(AdsListView);
