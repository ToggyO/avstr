import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Container from '../../../../Core/common/Container';
import Title from '../../../../Core/common/Title';


class NewAdvertisement extends Component {
    componentDidMount() {
        // console.log('Новое объявление');
    }

    render() {
        return (
            <Container>
                <Title text="Новое объявление" />
            </Container>
        );
    }
}

NewAdvertisement.propTypes = {};

export default NewAdvertisement;
