import React from 'react';
import PropTypes from 'prop-types';

import AdvertisementCard from '../AdvertisementCard';

import styles from './index.module.scss';

const AdvertisementsList = ({ advertisements, deleteAdvertisement }) => (
    <div className={styles.list}>
        {advertisements.map((advertisement) => {
            const { id } = advertisement;
            return (
                <AdvertisementCard
                    key={id}
                    content={advertisement}
                    deleteAdvertisement={deleteAdvertisement}
                />
            );
        })}
    </div>
);

AdvertisementsList.propTypes = {
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            creationTime: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    ).isRequired,
    deleteAdvertisement: PropTypes.func.isRequired,
};

export default AdvertisementsList;
