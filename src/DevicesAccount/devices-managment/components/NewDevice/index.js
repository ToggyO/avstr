import React from 'react';
// import PropTypes from 'prop-types';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Input from 'Core/common/Input';
import Button from 'Core/common/Button';

import styles from './index.module.scss';

const NewDevice = () => (
    <Container>
        <Title
            text="Новое устройство"
            className={styles.title}
        />
        <div>
            <span>1.</span>
            Включите устройство
        </div>
        <Input />
        <div>
            <span>2.</span>
            Введите код с экрана устройства
        </div>
        <div>
            <span>3.</span>
            Придумайте название
        </div>
        <Input />

        <div>
            <Button
                type="outline"
                size="medium"
                // className={styles.declineBtn}
                // onClick={}
            >
                Отменить
            </Button>

            <Button
                type="main"
                size="medium"
                // disabled={}
                // className={styles.saveBtn}
                // onClick={}
            >
                Далее
            </Button>
        </div>
    </Container>
);


NewDevice.propTypes = {};

export default NewDevice;
