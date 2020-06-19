// TODO: решить, необходим ли атрибут accept
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
    Button, Col, Row, Upload, Progress, message, Modal,
} from 'antd';
import { InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import history from 'Core/history';
import { StandardForm, FormItemWrapper } from 'Core/ant';
import { ROOT_ROUTES } from 'Core/constants';
import options from './options';

import styles from './index.module.scss';

class NewAdvertisement extends Component {
    acceptedMediaTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];

    maxFileSize = 524288000;

    formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
            md: {
                span: 24,
            },
            lg: {
                span: 6,
            },
            xl: {
                span: 6,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
            md: {
                span: 24,
            },
            lg: {
                span: 18,
            },
            xl: {
                span: 18,
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            controlledFileList: [],
            isUploadedToFileSystem: false,
            showError: false,
        };
        this.formRef = createRef();
    }

    componentDidUpdate(prevProps) {
        const { fileStatus } = this.props;
        if (prevProps.fileStatus !== fileStatus) {
            if (fileStatus === 'Success') {
                this.handleSuccessUploading();
            } else if (fileStatus === 'Error') {
                this.handleErrorUploading();
            }
        }
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
        const { changeFileStatus } = this.props;
        changeFileStatus('');
        message.success('Объявление успешно добавлено');
        history.push(ROOT_ROUTES.AD_MANAGER);
    };

    handleErrorUploading = () => {
        message.error('Что то пошло не так');
    };

    handleSaveClick = (values) => {
        const { saveClick } = this.props;
        const { controlledFileList } = this.state;

        const formattedValues = {
            advertiserEmail: values.advertiserEmail,
            name: values.name,
            startDate: values.rangeDate[0].toISOString(),
            endDate: values.rangeDate[1].toISOString(),
            file: controlledFileList[0].originFileObj,
            frequency: values.frequency,
            ticketId: values.ticketId,
        };
        saveClick(formattedValues);
    };

    handleCancelClick = () => {
        const { changeFileStatus } = this.props;
        const form = this.formRef.current;
        const values = form.getFieldsValue();

        if (this.checkEnteredValues(values)) {
            return Modal.confirm({
                title: 'Покинуть страницу?',
                icon: <ExclamationCircleOutlined />,
                content: 'Все несохраненные данные будут потеряны.',
                okText: 'Да',
                cancelText: 'Нет',
                maskClosable: false,
                onOk: () => history.push(ROOT_ROUTES.AD_MANAGER),
            });
        }
        changeFileStatus('');
        return history.push(ROOT_ROUTES.AD_MANAGER);
    };

    checkEnteredValues = (values) => {
        let flag = false;
        // eslint-disable-next-line array-callback-return
        Object.values(values).some((value) => {
            if (value) {
                flag = true;
            }
        });
        return flag;
    };

    validateFile = (file) => {
        if (file) {
            if (!this.acceptedMediaTypes.includes(file.type)) {
                message.error('Неверный формат файла', 6);
                return false;
            }

            if (file.size > this.maxFileSize) {
                message.error('Размер файла первышает допустымое значение', 6);
                return false;
            }

            return true;
        }
        return false;
    };

    handleDrop = ({ file, fileList, event }) => {
        if (event) event.preventDefault();
        const { controlledFileList } = this.state;

        if (!this.validateFile(file)) return;

        const form = this.formRef.current;

        this.toggleShowDragger();
        this.setState((prevState) => ({
            ...prevState,
            controlledFileList: controlledFileList.concat(fileList),
        }), () => form.validateFields(['fileList']));
    };

    handleRemove = (file) => {
        const { controlledFileList } = this.state;
        const filteredList = controlledFileList.filter(() => !file.uid);
        this.setState((prevState) => ({
            ...prevState,
            controlledFileList: filteredList,
        }));
    };

    toggleShowDragger = () => {
        const { isUploadedToFileSystem } = this.state;
        this.setState((prevState) => ({
            ...prevState,
            isUploadedToFileSystem: !isUploadedToFileSystem,
        }));
    };

    transformToPercent = (status) => {
        const [loaded, total] = status.split('/');
        return Math.ceil((loaded / total) * 100);
    };

    // isShowBtnLoader = () => {
    //     let result;
    //     const { loading, fileStatus } = this.props;
    //     if (fileStatus === 'Error') {
    //         result = false;
    //     } else {
    //         result = loading;
    //     }
    //     return result;
    // };

    render() {
        const { isUploadedToFileSystem, controlledFileList } = this.state;
        const { fileStatus, loading } = this.props;
        console.log(loading);
        return (
            <Row justify="center">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 18 }} xl={{ span: 16 }} xxl={{ span: 12 }}>
                    <div className={styles.progress_container}>
                        {fileStatus && (
                            <Progress percent={this.transformToPercent(fileStatus)} />
                        )}
                    </div>
                    <StandardForm
                        onFinish={this.handleSaveClick}
                        options={options}
                        wrappedRef={this.formRef}
                        {...this.formItemLayout}
                    >
                        <FormItemWrapper type="text-input" name="advertiserEmail" />
                        <FormItemWrapper type="text-input" name="name" />
                        <FormItemWrapper
                            type="range-picker"
                            name="rangeDate"
                            propsToChild={{
                                className: styles.input__range_picker,
                            }}
                        />
                        <FormItemWrapper
                            type="number-input"
                            name="frequency"
                            propsToChild={{
                                className: styles.input__number,
                            }}
                        />
                        <FormItemWrapper
                            type="text-input"
                            name="ticketId"
                            propsToChild={{
                                className: styles.input__number,
                            }}
                        />

                        <FormItemWrapper
                            type="custom-component"
                            name="fileList"
                            rules={[
                                {
                                    validator: () => {
                                        if (controlledFileList.length) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Выберите изображение или видео');
                                    },
                                },
                            ]}
                            component={(props) => (
                                <>
                                    <p
                                        className={styles.drop_description}
                                        style={{ display: isUploadedToFileSystem ? 'none' : 'block' }}
                                    >
                                        Максимальный размер файла - 50 МБ, фото - jpg, jpeg, png,
                                        разрешение экрана - 1920×1080 px
                                    </p>
                                    <Upload.Dragger
                                        accept={this.acceptedMediaTypes.join(', ')}
                                        fileList={controlledFileList}
                                        listType="picture"
                                        showUploadList={{ showPreviewIcon: false }}
                                        beforeUpload={() => false}
                                        onChange={this.handleDrop}
                                        onRemove={this.handleRemove}
                                        style={{ display: isUploadedToFileSystem ? 'none' : 'block' }}
                                        {...props}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область</p>
                                    </Upload.Dragger>
                                </>
                            )}
                        />

                        <Row justify="start">
                            <Col
                                xs={{ offset: 0 }}
                                sm={{ offset: 8 }}
                                md={{ offset: 6 }}
                                className={styles.buttons_block}
                            >
                                <FormItemWrapper
                                    type="custom-component"
                                    name="cancel"
                                    component={(props) => (
                                        <Button
                                            className={styles.declineBtn}
                                            onClick={this.handleCancelClick}
                                            {...props}
                                        >
                                            Отменить
                                        </Button>
                                    )}
                                />
                                <FormItemWrapper
                                    type="custom-component"
                                    name="submit"
                                    component={(props) => (
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className={styles.saveBtn}
                                            loading={loading}
                                            {...props}
                                        >
                                            Сохранить
                                        </Button>
                                    )}
                                />
                            </Col>
                        </Row>
                    </StandardForm>
                </Col>
            </Row>
        );
    }
}

NewAdvertisement.defaultProps = {
    uploadingConnection: null,
    loading: false,
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
    loading: PropTypes.bool,
};

export default NewAdvertisement;
