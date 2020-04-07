import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import history from 'Core/history';
import NewDevice from '../components/NewDevice';


const NewDevicePage = () => {
    const handleDeclineBtn = () => {
        history.push('/devices/main/list');
    };
    return (
        <NewDevice
            declineBtnHandler={handleDeclineBtn}
        />
    );
};


NewDevicePage.propTypes = {
    //
};


const mapStateToProps = () => ({});

const mapDispatchToProps = {
    //
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
