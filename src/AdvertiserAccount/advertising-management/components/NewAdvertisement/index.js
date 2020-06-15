import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import history from 'Core/history';

import Dropzone from 'react-dropzone';
import Container from 'Core/common/Container';
import Title from 'Core/common/Title';
import Button from 'Core/common/Button';
import Input from 'Core/common/Input';
import { ROOT_ROUTES } from 'Core/constants';

import styles from './index.module.scss';

import UploadedFileCard from '../UploadedFileCard';
import ProgressBar from '../ProgressBar';


class NewAdvertisement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisementText: '',
            file: null,
            thumbnail: null,
        };
        this.dropZoneRef = createRef();
    }

    componentDidMount() {
        this.handleSuccessUploading();
    }

    componentDidUpdate() {
        this.handleSuccessUploading();
    }

    componentWillUnmount() {
        const { changeFileStatus, uploadingConnection, cleanUploadConnection } = this.props;
        changeFileStatus('');

        if (uploadingConnection) {
            uploadingConnection.abort();
            cleanUploadConnection();
        }
    }

    handleSuccessUploading = () => {
        const { fileStatus, changeFileStatus } = this.props;
        if (fileStatus !== 'Success') return;
        changeFileStatus('');
        history.push(ROOT_ROUTES.AD_MANAGER);
    };

    handleAdvertisementTextChange = ({ target: { value } }) => {
        this.setState({
            advertisementText: value,
        });
    };

    handleDrop = (accepted, rejected) => {
        if (rejected.length) {
            alert('Размер файла или его расширение не соответсвует требованиям');
        }
        if (accepted && accepted.length !== 0) {
            const data = accepted[0];
            const reader = new FileReader();
            reader.onload = ({ target: { result } }) => {
                if (data.type === 'video/mp4') {
                    this.setState({
                        thumbnail: '../stub2.jpg',
                    });
                } else {
                    this.setState({
                        thumbnail: result,
                    });
                }
                const { changeFileStatus } = this.props;
                changeFileStatus('FileAdded');
                this.saveFile(data);
            };
            reader.readAsDataURL(accepted[0]);
        }
    };

    handleSaveClick = () => {
        const { saveClick } = this.props;
        const { advertisementText, file } = this.state;
        saveClick({ advertisementText, file });
    };

    handleCancelClick = () => {
        const { changeFileStatus } = this.props;
        changeFileStatus('');
        history.push(ROOT_ROUTES.AD_MANAGER);
    };


    saveFile = (data) => {
        this.setState({
            file: data,
        });
    };

    renderBtns = () => {
        const { advertisementText, file } = this.state;
        const { fileStatus } = this.props;
        return (
            <div>
                <Button
                    type="outline"
                    size="medium"
                    className={styles.declineBtn}
                    onClick={this.handleCancelClick}
                >
                    Отменить
                </Button>

                <Button
                    type="main"
                    size="medium"
                    disabled={
                        advertisementText === ''
                        || !file
                        || (fileStatus !== ''
                            && fileStatus !== 'FileAdded'
                            && fileStatus !== 'Success')
                    }
                    className={styles.saveBtn}
                    onClick={this.handleSaveClick}
                >
                    Сохранить
                </Button>
            </div>
        );
    };

    renderDropzoneContent = (status) => {
        const { thumbnail } = this.state;
        const { fileStatus } = this.props;
        switch (status) {
            case '':
                return (
                    <>
                        <Dropzone
                            onDrop={this.handleDrop}
                            accept="image/jpeg, image/png, image/jpg, video/mp4"
                            maxSize={524288000}
                            multiple={false}
                            ref={this.dropZoneRef}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    className={styles.dropZone}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <div className={styles.text}>
                                        Щелкните здесь, чтобы выбрать файл на&nbsp;компьютере или перетащите сюда
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                        {this.renderBtns()}
                    </>
                );
            case 'FileAdded':
                return (
                    <>
                        <UploadedFileCard pathToImg={thumbnail} />
                        {this.renderBtns()}
                    </>
                );
            default:
                return (
                    <ProgressBar status={fileStatus} />
                );
        }
    };

    render() {
        const { advertisementText } = this.state;
        const { fileStatus } = this.props;
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
                    onChange={this.handleAdvertisementTextChange}
                />

                <div className={styles.description}>
                    Максимальный размер файла 500&nbsp;МБ (jpg, jpeg, png, mp4), рекомендуемое разрешение
                    1920&times;1080&nbsp;px
                </div>

                {this.renderDropzoneContent(fileStatus)}
            </Container>
        );
    }
}

NewAdvertisement.defaultProps = {
    uploadingConnection: null,
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
    uploadingConnection: PropTypes.shape(),
    cleanUploadConnection: PropTypes.func.isRequired,
};

export default NewAdvertisement;
