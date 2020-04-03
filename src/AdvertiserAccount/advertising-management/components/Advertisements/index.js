import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';
import AdvertisementsList from '../AdvertisementsList';

import styles from './index.module.scss';


const Advertisements = ({ addBtnHandler, advertisements, deleteAdvertisement }) => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text={advertisements.length ? 'Объявления' : 'Здесь пока нет объявлений'}
            />
            <Button
                type="main"
                withIcon
                className={styles.btn}
                onClick={addBtnHandler}
            >
                <Icon name="plus" />
                Добавить
            </Button>
        </div>
        {advertisements.length
            ? (
                <AdvertisementsList
                    advertisements={advertisements}
                    deleteAdvertisement={deleteAdvertisement}
                />
            )
            : ''}
    </Container>
);


Advertisements.propTypes = {
    addBtnHandler: PropTypes.func.isRequired,
    deleteAdvertisement: PropTypes.func.isRequired,
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            creationTime: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    ).isRequired,
};

export default Advertisements;
