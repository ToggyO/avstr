import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProp } from 'Core/utils/getProp';
import { confirmAdRegistration } from '../../action-creators';


const AdRegisterConfirm = ({ confirmAdRegistrationAction }) => {
    const url = new URL(window.location);
    const user = url.searchParams.get('user');
    const code = url.searchParams.get('code');

    useEffect(() => {
        confirmAdRegistrationAction({ email: user, code });
    });

    return (
        <div>
            Загрузка
        </div>
    );
};

AdRegisterConfirm.defaultProps = {
    confirmAdRegistrationAction: Function.prototype,
};

AdRegisterConfirm.propTypes = {
    confirmAdRegistrationAction: PropTypes.func,
};

const mapStateToProps = ({ advertiserRegistrationReducer }) => ({
    loading: getProp(advertiserRegistrationReducer, 'loading', false),
});

const mapDispatchToProps = {
    confirmAdRegistrationAction: confirmAdRegistration,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdRegisterConfirm);
