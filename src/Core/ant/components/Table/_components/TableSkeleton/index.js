import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

const TableSkeleton = ({ items, ...rest }) => (
    <>
        {items.map((item, index) => (
            <div key={`skeletonKey_${index + 1}_${item}`}>
                <Skeleton {...rest} />
            </div>
        ))}
    </>
);

TableSkeleton.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array.isRequired,
};

export default TableSkeleton;
