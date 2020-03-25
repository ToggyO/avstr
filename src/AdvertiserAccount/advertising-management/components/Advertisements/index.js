import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import AdvertisementsList from '../AdvertisementsList';

import styles from './index.module.scss';


const Advertisements = ({ addBtnHandler, advertisements }) => {
    console.log('render advertisements');
    return (
        <Container>
            <div className={styles.wrap}>
                <Title
                    className={styles.title}
                    text={advertisements.length ? 'Объявления' : 'Здесь пока нет объявлений'}
                />
                <Button
                    className={styles.btn}
                    onClick={addBtnHandler}
                >
                    <Icon name="plus" />
                    Добавить
                </Button>
            </div>
            {advertisements.length
                ? (
                    <AdvertisementsList advertisements={advertisements} />
                )
                : ''}
        </Container>
    );
};


Advertisements.propTypes = {
    addBtnHandler: PropTypes.func.isRequired,
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            creationTime: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    ).isRequired,
};

export default memo(Advertisements);
