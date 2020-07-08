import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setDefaultState } from 'Core/advertiserRegistration/action-creators';

import LoginLayoutView from './View';

const mapDispatchToProps = {
    setDefaultStateAction: setDefaultState,
};

export default compose(
    connect(null, mapDispatchToProps),
    withRouter,
)(LoginLayoutView);
