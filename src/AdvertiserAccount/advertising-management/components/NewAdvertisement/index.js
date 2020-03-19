import React, { useState, useRef } from 'react';
import { Button, Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';

import styles from './index.module.scss';

// import PropTypes from 'prop-types';


const NewAdvertisement = () => {
    const [advertisementText, setAdvertisementText] = useState('');
    const dropZoneRef = useRef();

    const handleAdvertisementTextChange = ({ target: { value } }) => {
        setAdvertisementText(value);
    };

    const handleDrop = (accepted, rejected) => {
        if (rejected.length) {
            alert('Ошибка добавления в дроп зону');
        }
        if (accepted && accepted.length !== 0) {
            console.log(accepted);
        }
    };

    return (
        <Container className={styles.newAdvertisement}>
            <Title
                className={styles.title}
                text="Новое объявление"
            />
            <Input
                className={styles.input}
                placeholder="Название"
                value={advertisementText}
                onChange={handleAdvertisementTextChange}
            />

            <div className={styles.description}>
                Максимальный размер загружаемого файла 10&nbsp;
                Мб, размер изображения 1920&times;1080рх
            </div>

            <Dropzone
                onDrop={handleDrop}
                accept="image/jpeg, image/png, image/jpg, application/pdf video/mp4"
                maxSize={10485760}
                multiple={false}
                ref={dropZoneRef}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            className={styles.dropZone}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <div className={styles.text}>
                                Щелкните здесь, чтобы выбрать файл на&nbsp;компьютере или перетащите сюда
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>

            <div>
                <Button className={styles.declineBtn}>Отменить</Button>
                <Button disabled>Сохранить</Button>
            </div>
        </Container>
    );
};

NewAdvertisement.propTypes = {};

export default NewAdvertisement;
