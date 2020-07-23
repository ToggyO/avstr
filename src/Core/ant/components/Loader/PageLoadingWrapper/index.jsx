import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const PageLoadingWrapper = ({
    children,
    loading,
    size,
    style,
}) => (
    <Spin size={size} spinning={loading} style={style}>
        {children}
    </Spin>
);

PageLoadingWrapper.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    style: PropTypes.objectOf(PropTypes.any),
};

PageLoadingWrapper.defaultProps = {
    children: null,
    loading: false,
    size: 'large',
    style: {},
};

export default PageLoadingWrapper;
