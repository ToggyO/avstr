// TODO: решить, необходим ли атрибут accept
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Row,
    Progress,
    message,
    Modal,
    Select,
    Spin,
    Typography,
} from 'antd';
import { InboxOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import history from 'Core/history';
import { StandardForm, FormItemWrapper, AntDragger } from 'Core/ant';
import { ROOT_ROUTES } from 'Core/constants';
import trimFormValues from 'Core/utils/trimFormValues';
import options from './options';

import styles from './index.module.scss';

const { Text } = Typography;

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
            }
        }
    }

    componentWillUnmount() {
        const {
            changeFileStatus,
            uploadingConnection,
            cleanUploadConnection,
            advertisersReset,
            advertisers,
            cleanErrors,
        } = this.props;
        changeFileStatus('');

        if (uploadingConnection) {
            uploadingConnection.abort();
            cleanUploadConnection();
        }

        if (advertisers && advertisers.length) {
            advertisersReset();
        }

        cleanErrors();
    }

    handleSuccessUploading = () => {
        const { changeFileStatus } = this.props;
        changeFileStatus('');
        message.success('Объявление успешно добавлено');
        history.push(ROOT_ROUTES.AD_MANAGER);
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

        saveClick(trimFormValues(formattedValues));
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
        this.toggleShowDragger();
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

    handleAdvertiserSearch = (value) => {
        const { advertiserSearch } = this.props;

        if (!value.trim()) {
            return;
        }

        advertiserSearch({
            template: value,
            count: 4,
        });
    }

    render() {
        const { isUploadedToFileSystem, controlledFileList } = this.state;
        const {
            fileStatus,
            loading,
            advertisersPending,
            advertisers,
            errorsFromBackend,
        } = this.props;

        return (
            <Row justify="center">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 18 }} xxl={{ span: 12 }}>
                    <div className={styles.progressContainer}>
                        {fileStatus && (
                            <Progress percent={this.transformToPercent(fileStatus)} />
                        )}
                    </div>
                    <StandardForm
                        layout="horizontal"
                        size="large"
                        onFinish={this.handleSaveClick}
                        options={options}
                        wrappedRef={this.formRef}
                        errorsFromBackend={errorsFromBackend}
                        {...this.formItemLayout}
                    >
                        <FormItemWrapper
                            type="custom-component"
                            name="advertiserEmail"
                            component={(props) => (
                                <Select
                                    showSearch
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    optionLabelProp="label"
                                    onSearch={this.handleAdvertiserSearch}
                                    notFoundContent={advertisersPending ? <Spin size="small" /> : null}
                                    {...props}
                                >
                                    {advertisers.map((advertiser) => (
                                        <Select.Option
                                            key={advertiser.id}
                                            value={advertiser.email}
                                            label={`${advertiser.email} — ${advertiser.organization}`}
                                        >
                                            {advertiser.email}
                                            <br />
                                            <Text type="secondary">{advertiser.organization}</Text>
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />

                        <FormItemWrapper type="text-input" name="name" />

                        <FormItemWrapper
                            type="range-picker"
                            name="rangeDate"
                            propsToChild={{
                                className: styles.input__rangePicker,
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
                                    <AntDragger
                                        accept={this.acceptedMediaTypes.join(', ')}
                                        fileList={controlledFileList}
                                        listType="picture"
                                        previewFile={this.previewImage}
                                        onChange={this.handleDrop}
                                        onRemove={this.handleRemove}
                                        isDraggerShown={!isUploadedToFileSystem}
                                        {...props}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область</p>
                                    </AntDragger>
                                </>
                            )}
                        />

                        <Row justify="start">
                            <Col
                                xs={{ offset: 0 }}
                                sm={{ offset: 8 }}
                                md={{ offset: 6 }}
                                className={styles.buttonsBlock}
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
    advertisers: [],
    errorsFromBackend: {},
    cleanErrors: Function.prototype,
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
    advertiserSearch: PropTypes.func.isRequired,
    advertisersReset: PropTypes.func.isRequired,
    advertisersPending: PropTypes.bool.isRequired,
    advertisers: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        organization: PropTypes.string.isRequired,
    })),
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
    cleanErrors: PropTypes.func,
};

export default NewAdvertisement;
