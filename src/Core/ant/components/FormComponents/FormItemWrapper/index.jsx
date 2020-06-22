import React, { useContext } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
} from 'antd';
import MaskedInput from 'antd-mask-input';
import PropTypes from 'prop-types';

import { StandardFormContext } from '../ContextForm';

const { RangePicker } = DatePicker;

const FormItemWrapper = ({
    type,
    name,
    dataSource = [],
    component = () => <div />,
    formItemStyle,
    propsToChild,
    children,
    ...restFormItemProps
}) => {
    let getOptions;
    const { form, options } = useContext(StandardFormContext);

    if (typeof options === 'function') {
        getOptions = options(form);
    } else {
        getOptions = options;
    }

    const {
        props: componentProps = {},
        formItemStyle: fomItemStyleFromOptions = {},
        ...restItemProps
    } = getOptions[name] || {};
    const { selectOptions } = componentProps;

    const fieldType = () => {
        switch (type) {
            case 'text-input':
                return <Input {...componentProps} {...propsToChild} />;
            case 'password-input':
                return <Input.Password {...componentProps} {...propsToChild} />;
            case 'number-input':
                return <InputNumber {...componentProps} {...propsToChild} />;
            case 'text-area':
                return <Input.TextArea {...componentProps} {...propsToChild} />;
            case 'select':
                return (
                    <Select {...componentProps} {...propsToChild}>
                        {selectOptions.map((option) => (
                            <Select.Option value={option.key} key={option.key}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'async-load-select':
                return (
                    <Select {...componentProps} {...propsToChild}>
                        {dataSource.map((data) => (
                            <Select.Option value={data.key} key={data.key}>
                                {data.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'date-picker':
                return <DatePicker {...componentProps} {...propsToChild} />;
            case 'range-picker':
                return <RangePicker {...componentProps} {...propsToChild} />;
            case 'phoneNumber':
                return <MaskedInput {...componentProps} {...propsToChild} />;
            case 'custom-component':
                return component({ ...componentProps, ...propsToChild });
            case 'render-component':
                return typeof children === 'function'
                    ? children({ ...componentProps, ...propsToChild })
                    : children;
            default:
                return <Input {...componentProps} {...propsToChild} />;
        }
    };

    return (
        <Form.Item
            name={name}
            style={formItemStyle || fomItemStyleFromOptions}
            {...restFormItemProps}
            {...restItemProps}
        >
            {fieldType()}
        </Form.Item>
    );
};

FormItemWrapper.propTypes = {
    type: PropTypes.oneOf([
        'text-input',
        'password-input',
        'number-input',
        'select',
        'async-load-select',
        'text-area',
        'date-picker',
        'range-picker',
        'phoneNumber',
        'custom-component',
        'render-component',
    ]).isRequired,
    name: PropTypes.string.isRequired,
    dataSource: PropTypes.shape({
        key: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
        label: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    }),
    component: PropTypes.func,
    formItemStyle: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    propsToChild: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    children: PropTypes.node,
};

FormItemWrapper.defaultProps = {
    dataSource: undefined,
    component: () => <div />,
    formItemStyle: undefined,
    propsToChild: undefined,
    children: null,
};

export default FormItemWrapper;
