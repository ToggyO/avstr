import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import Container from '../../../../Core/common/Container/Container';
import NavBar from '../../../../Core/common/NavBar/NavBar';
import Title from '../../../../Core/common/Title/Title';

import styles from './Advertisements.module.scss';


const Advertisements = ({ title, navBarBtnHandler, addBtnHandler }) => (
    <Container>
        <NavBar handleLogoutClick={navBarBtnHandler} />
        <Title text={title} />
        <Button
            className={styles.btn}
            onClick={addBtnHandler}
        >
            Добавить
        </Button>
    </Container>
);


Advertisements.propTypes = {
    title: PropTypes.string.isRequired,
    navBarBtnHandler: PropTypes.func.isRequired,
    addBtnHandler: PropTypes.func.isRequired,
};


export default Advertisements;
