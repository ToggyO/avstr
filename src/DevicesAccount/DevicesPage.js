import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
import history from 'Core/history';


import Devices from './devices-managment/components/Devices';


class DevicesPage extends Component {
    componentDidMount() {
        // const {  } = this.props;
    }

    handleAddBtn = () => {
        history.push('/advertiser/add');
    };

    render() {
        // const { } = this.props;
        return (
            <Devices />
        );
    }
}


DevicesPage.propTypes = {
    //
};

// const mapStateToProps = ({}) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage);

export default DevicesPage;
