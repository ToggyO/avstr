import React, {
    useState,
    useRef,
    memo,
} from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';

import styles from './index.module.scss';
import UploadedFileCard from '../UploadedFileCard';
import ProgressBar from '../ProgressBar';


const NewAdvertisement = ({
    fileStatus,
    content,
    saveClick,
    changeFileStatus,
}) => {
    const [advertisementText, setAdvertisementText] = useState('');
    const [file, setFile] = useState(null);
    const dropZoneRef = useRef();

    const handleAdvertisementTextChange = ({ target: { value } }) => {
        setAdvertisementText(value);
    };

    const handleDrop = (accepted, rejected) => {
        if (rejected.length) {
            alert('Ошибка добавления в дроп зону');
        }
        if (accepted && accepted.length !== 0) {
            if (!advertisementText) {
                alert('Введите название объявления.');
                return;
            }
            const data = accepted[0];
            setFile(data);
            saveClick({ advertisementText, file: data });
        }
    };

    const handleSaveClick = () => {
        setAdvertisementText('');
        setFile(null);
        changeFileStatus('');
    };

    const handleCancelClick = () => {
        setAdvertisementText('');
        setFile(null);
        changeFileStatus('');
    };

    const renderDropzoneContent = (status) => {
        switch (status) {
            case '':
                return (
                    <Dropzone
                        onDrop={handleDrop}
                        accept="image/jpeg, image/png, image/jpg, video/mp4"
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
                );
            case 'Success':
                return (
                    <UploadedFileCard pathToImg={content.url} />
                );
            default:
                return (
                    <ProgressBar status={fileStatus} />
                );
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

            {renderDropzoneContent(fileStatus)}

            <div>
                <Button
                    className={styles.declineBtn}
                    onClick={handleCancelClick}
                >
                    Отменить
                </Button>

                <Button
                    disabled={advertisementText === '' || !file}
                    onClick={handleSaveClick}
                >
                    Сохранить
                </Button>
            </div>
        </Container>
    );
};

NewAdvertisement.propTypes = {
    fileStatus: PropTypes.string.isRequired,
    content: PropTypes.shape({
        name: PropTypes.string.isRequired,
        creationTime: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        lastModificationTime: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    saveClick: PropTypes.func.isRequired,
    changeFileStatus: PropTypes.func.isRequired,
};

export default memo(NewAdvertisement);
