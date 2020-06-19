import React from 'react';
import { Upload, Spin, Skeleton } from 'antd';
import PropTypes from 'prop-types';

import AnimationWrapper from 'Core/common';
import { VideoPreview, ImagePreview } from './_components';

import styles from './index.module.scss';

class AntDragger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVideo: null,
            selectedImage: null,
            loading: false,
        };
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.captureFrameFromVideo(0.07);
    }

    captureFrameFromVideo = (scale) => {
        const video = this.videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                const canvas = this.canvasRef.current;
                setTimeout(() => {
                    if (canvas) {
                        canvas
                            .getContext('2d')
                            .drawImage(
                                video,
                                0,
                                0,
                                video.videoWidth * scale,
                                video.videoHeight * scale,
                            );
                    }
                }, 100);
            };
        }
    };

    viewAttachment = (file) => {
        const reader = new FileReader();

        reader.onloadstart = () => this.setState((prevState) => ({
            ...prevState,
            loading: true,
        }));

        reader.onload = (e) => {
            let paramToState;
            const newSelectedAttachment = {};
            newSelectedAttachment.file = file;
            newSelectedAttachment.blobData = e.target.result;

            if (file.type.includes('video')) {
                paramToState = 'selectedVideo';
            }

            if (file.type.includes('image')) {
                paramToState = 'selectedImage';
            }

            this.setState((prevState) => ({
                ...prevState,
                [paramToState]: newSelectedAttachment,
                loading: false,
            }));
        };

        reader.readAsDataURL(file);
    };

    handleRemove = (file) => {
        const { onRemove } = this.props;
        this.setState((prevState) => ({
            ...prevState,
            selectedVideo: null,
            selectedImage: null,
        }));
        onRemove(file);
    };

    render = () => {
        const {
            children,
            onChange,
            isDraggerShown,
            ...rest
        } = this.props;
        const { selectedVideo, selectedImage, loading } = this.state;
        return (
            <>
                <Spin spinning={loading} style={{ marginBottom: 40 }}>
                    <Skeleton
                        loading={loading}
                        avatar
                        title={false}
                        paragraph={{ rows: 2 }}
                    />
                    <AnimationWrapper
                        show={isDraggerShown}
                        showAnimName="dragger_in"
                        hideAnimName="dragger_out"
                        restAnimationProps={{ duration: '0.2s' }}
                    >
                        <p
                            className={styles.drop_description}
                        >
                            Максимальный размер файла - 50 МБ, фото - jpg, jpeg, png,
                            разрешение экрана - 1920×1080 px
                        </p>
                        <Upload.Dragger
                            multiple={false}
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={(info) => {
                                if (info.file.status !== 'uploading') {
                                    this.viewAttachment(info.file);
                                }
                                onChange(info);
                            }}
                            {...rest}
                        >
                            {children}
                        </Upload.Dragger>
                    </AnimationWrapper>
                    <VideoPreview
                        selectedVideo={selectedVideo}
                        onRemove={() => this.handleRemove(selectedVideo.file)}
                        videoRef={this.videoRef}
                        canvasRef={this.canvasRef}
                    />
                    <ImagePreview
                        selectedImage={selectedImage}
                        onRemove={() => this.handleRemove(selectedImage.file)}
                    />
                </Spin>
            </>
        );
    };
}

AntDragger.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    isDraggerShown: PropTypes.bool,
};

AntDragger.defaultProps = {
    children: null,
    onChange: Function.prototype,
    onRemove: Function.prototype,
    isDraggerShown: true,
};

export default AntDragger;
