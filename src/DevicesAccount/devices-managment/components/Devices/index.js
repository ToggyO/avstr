import React from 'react';
// import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';


import styles from './index.module.scss';

const devices = [12];

const Devices = () => (
    <Container>
        <div className={styles.wrap}>
            <Title
                className={styles.title}
                text={devices.length ? 'Устройства' : 'Нет зарегистрированных устройств'}
            />
            <Button
                type="main"
                size="withIcon"
                className={styles.btn}
                // onClick={addBtnHandler}
            >
                <Icon name="plus" />
                Добавить
            </Button>
        </div>
        {/* {devices.length
            ? (
                <AdvertisementsList
                    advertisements={advertisements}
                    deleteAdvertisement={deleteAdvertisement}
                />
            )
            : ''} */}
    </Container>
);


Devices.propTypes = {
    //
};

export default Devices;
