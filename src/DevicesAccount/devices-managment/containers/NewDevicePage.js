import React from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import NewDevice from '../components/NewDevice';


const NewDevicePage = () => (
    <NewDevice />
);


NewDevicePage.propTypes = {
    //
};


const mapStateToProps = () => ({});

const mapDispatchToProps = {
    //
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevicePage);
