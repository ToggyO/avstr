import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const PageLoadingWrapper = ({ children, loading, size }) => (
    <Spin size={size} spinning={loading}>
        {children}
    </Spin>
);

PageLoadingWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
};

PageLoadingWrapper.defaultProps = {
    children: null,
    loading: false,
    size: 'large',
};

export default PageLoadingWrapper;
