import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const UploadCard = ({ children, fileName, onRemove }) => (
    <div className={styles.upload_card}>
        <div className={styles.upload_card__image}>
            {children}
        </div>
        <div className={styles.upload_card__fileName}>
            {fileName}
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <span onClick={onRemove} className={styles.upload_card__remove}>
            <DeleteOutlined />
        </span>
    </div>
);

UploadCard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    fileName: PropTypes.string,
    onRemove: PropTypes.func,
};

UploadCard.defaultProps = {
    children: null,
    fileName: '',
    onRemove: Function.prototype,
};

export default UploadCard;
