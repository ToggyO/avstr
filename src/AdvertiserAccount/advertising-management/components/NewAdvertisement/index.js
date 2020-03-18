import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import Container from 'Core/common/Container';
import Title from 'Core/common/Title';

import styles from './index.module.scss';

// import PropTypes from 'prop-types';


const NewAdvertisement = () => {
    const [advertisementText, setAdvertisementText] = useState('');

    const handleAdvertisementTextChange = ({ target: { value } }) => {
        setAdvertisementText(value);
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
                onDrop={(acceptedFiles) => console.log(acceptedFiles)}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            className={styles.dropZone}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p>Drag n drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            {/* <Input
                className={styles.dropZone}
                name="file"
                type="file"
            /> */}

            <div>
                <Button className={styles.declineBtn}>Отменить</Button>
                <Button>Сохранить</Button>
            </div>
        </Container>
    );
};

NewAdvertisement.propTypes = {};

export default NewAdvertisement;
