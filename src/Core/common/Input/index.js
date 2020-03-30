import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Input as Field } from 'semantic-ui-react';

import styles from './index.module.scss';

const Index = ({
    className,
    type,
    placeholder,
    value,
    ...props
}) => (
    <Field
        type={type}
        placeholder={placeholder}
        value={value}
        className={cn(styles.input, className)}
        {...props}
    />
);


Index.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    className: '',
};

Index.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes,
};

export default Index;
