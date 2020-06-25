import React, { useEffect } from 'react';
import {
    Button,
    Checkbox,
    Divider,
    Row,
} from 'antd';
import PropTypes from 'prop-types';

import './index.styles.scss';

const CheckboxFilter = ({
    query,
    clearFilters,
    confirm,
    filters,
    selectedKeys,
    setSelectedKeys,
    // eslint-disable-next-line no-unused-vars
    ...rest
}) => {
    const copiedFilters = filters.map((filter) => ({ ...filter }));

    const createDefaultValue = (val) => {
        const listOfStatuses = [];
        copiedFilters.reverse().reduce((acc, { value }) => {
            if (!acc) return false;

            const parsedKey = parseInt(value, 10);
            if (parsedKey > acc) {
                return acc;
            }

            listOfStatuses.push(parsedKey);
            const subtractedValue = acc - parsedKey;
            if (subtractedValue !== 0) {
                return subtractedValue;
            }

            return false;
        }, parseInt(val, 10));

        return listOfStatuses;
    };

    useEffect(() => {
        if (query) setSelectedKeys(createDefaultValue(query));
    }, [query]);

    return (
        <div className="checkbox-filter">
            <div className="checkbox-filter__checkbox-container">
                <Checkbox.Group
                    options={filters}
                    value={selectedKeys}
                    onChange={(checkedValue) => setSelectedKeys(checkedValue || '')}
                    className="checkbox-filter__checkbox-group"
                />
            </div>
            <Divider style={{ margin: 0 }} />
            <Row
                justify="start"
                className="checkbox-filter__buttons"
            >
                <Button
                    size="small"
                    htmlType="button"
                    onClick={() => {
                        setSelectedKeys([]);
                        clearFilters();
                    }}
                >
                    Сбросить
                </Button>
                <Button
                    size="small"
                    type="primary"
                    htmlType="button"
                    onClick={() => confirm()}
                >
                    Ок
                </Button>
            </Row>
        </div>
    );
};

CheckboxFilter.propTypes = {
    query: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    clearFilters: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.any,
        }),
    ),
    selectedKeys: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.any),
        PropTypes.string,
    ]).isRequired,
    setSelectedKeys: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

CheckboxFilter.defaultProps = {
    query: '',
    filters: [],
};

export default CheckboxFilter;
