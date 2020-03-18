import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import Container from '../../../../Core/common/Container/Container';
import Title from '../../../../Core/common/Title/Title';

import styles from './Advertisements.module.scss';


const Advertisements = ({ title, addBtnHandler }) => (
    <Container>
        <div className={styles.wrap}>
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
        </div>
    </Container>
);


Advertisements.propTypes = {
    title: PropTypes.string.isRequired,
    addBtnHandler: PropTypes.func.isRequired,
};

export default Advertisements;
