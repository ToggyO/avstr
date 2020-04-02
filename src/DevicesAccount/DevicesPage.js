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
        history.push('/devices/add');
    };

    render() {
        // const { } = this.props;
        const devices = [{
            id: 0,
            name: 'Vasia',
            serialNumber: '123',
            isActive: true,
        }];
        return (
            <Devices devices={devices} />
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
