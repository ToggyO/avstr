import React, { memo } from 'react';
import PropTypes from 'prop-types';

import AdvertisementCard from '../AdvertisementCard';

import styles from './index.module.scss';


const AdvertisementsList = ({ advertisements }) => {
    console.log('render list!');
    return (
        <div className={styles.list}>
            {advertisements.map((advertisement) => {
                const { id } = advertisement;
                return (
                    <AdvertisementCard
                        key={id}
                        content={advertisement}
                    />
                );
            })}
        </div>
    );
};


AdvertisementsList.propTypes = {
    advertisements: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            creationTime: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
    ).isRequired,
};

export default memo(AdvertisementsList);
