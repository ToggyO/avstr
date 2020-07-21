import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { PageLoadingWrapper } from 'Core/ant';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';
import AdvertisementsList from '../AdvertisementsList';

import styles from './index.module.scss';

const Advertisements = ({
    addBtnHandler,
    advertisements,
    deleteAdvertisement,
    loading,
}) => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text="Объявления"
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
        <PageLoadingWrapper loading={loading} style={{ height: '100vh' }}>
            {(!advertisements.length && !loading) && 'Здесь пока нет объявлений'}
            <AdvertisementsList
                advertisements={advertisements}
                deleteAdvertisement={deleteAdvertisement}
            />
        </PageLoadingWrapper>
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
    loading: PropTypes.bool,
};

Advertisements.defaultProps = {
    loading: false,
};

export default Advertisements;
