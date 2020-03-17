import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import Container from '../../../Core/common/Container/Container';
import NavBar from '../../../Core/common/NavBar/NavBar';
import Title from '../../../Core/common/Header/Title';

import styles from './AdvertiserAccount.module.scss';


const AdvertiserAccount = ({ navBarBtnHandler }) => (
    <Container>
        <NavBar handleLogoutClick={navBarBtnHandler} />
        <Title text="Кабинет рекламодателя" />
        <Button
            className={styles.btn}
        >
            Добавить
        </Button>
    </Container>
);


AdvertiserAccount.propTypes = {
    navBarBtnHandler: PropTypes.func.isRequired,
};


export default AdvertiserAccount;
