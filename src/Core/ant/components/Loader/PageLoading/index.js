import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const PageLoading = ({ size }) => (
    <Spin className={styles.page_loading} size={size} />
);

PageLoading.propTypes = {
    size: PropTypes.oneOf(['small', 'default', 'large']),
};

PageLoading.defaultProps = {
    size: 'large',
};

export default PageLoading;
