import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';

import styles from './index.module.scss';


const Advertisements = ({ title, addBtnHandler }) => (
    <Container className={styles.wrap}>
        <Title
            className={styles.title}
            text={title}
        />
        <Button
            className={styles.btn}
            onClick={addBtnHandler}
        >
            <Icon name="plus" />
            Добавить
        </Button>
    </Container>
);


Advertisements.propTypes = {
    title: PropTypes.string.isRequired,
    addBtnHandler: PropTypes.func.isRequired,
};

export default Advertisements;
