import React, {
    useState,
    useRef,
    memo,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import { Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';

import styles from './index.module.scss';

import UploadedFileCard from '../UploadedFileCard';
import ProgressBar from '../ProgressBar';


const NewAdvertisement = ({
    fileStatus,
    saveClick,
    changeFileStatus,
}) => {
    const [advertisementText, setAdvertisementText] = useState('');
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const dropZoneRef = useRef();

    const handleAdvertisementTextChange = ({ target: { value } }) => {
        setAdvertisementText(value);
    };

    const handleDrop = (accepted, rejected) => {
        if (rejected.length) {
            alert('Размер файла или его расширение не соответсвует требованиям');
        }
        if (accepted && accepted.length !== 0) {
            const data = accepted[0];
            const reader = new FileReader();
            reader.onload = ({ target: { result } }) => {
                if (data.type === 'video/mp4') {
                    setThumbnail('./');
                } else {
                    setThumbnail(result);
                }
                changeFileStatus('FileAdded');
                setFile(data);
            };
            reader.readAsDataURL(accepted[0]);
        }
    };

    const handleSaveClick = () => {
        saveClick({ advertisementText, file });
    };

    const handleCancelClick = () => {
        changeFileStatus('');
        history.push('/advertiser');
    };

    useEffect(() => {
        if (fileStatus !== 'Success') return;
        changeFileStatus('');
        history.push('/advertiser');
    });

    const renderDropzoneContent = (status) => {
        switch (status) {
            case '':
                return (
                    <Dropzone
                        onDrop={handleDrop}
                        accept="image/jpeg, image/png, image/jpg, video/mp4"
                        maxSize={524288000}
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
            case 'FileAdded':
                return (
                    <UploadedFileCard pathToImg={thumbnail} />
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
                Максимальный размер файла 500&nbsp;МБ (jpg, jpeg, png, mp4), рекомендуемое разрешение
                1920&times;1080&nbsp;px
            </div>

            {renderDropzoneContent(fileStatus)}

            <div>
                <Button
                    type="outline"
                    size="medium"
                    className={styles.declineBtn}
                    onClick={handleCancelClick}
                >
                    Отменить
                </Button>

                <Button
                    type="main"
                    size="medium"
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
