import React, { useEffect } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { useBackendErrors } from '../../../helpers';

export const StandardFormContext = React.createContext({
    form: {},
    options: {},
});

export const StandardForm = ({
    children,
    onFinish,
    onFinishFailed,
    options,
    outerFormInstance,
    asyncInitValues,
    errorsFromBackend,
    wrappedRef,
    ...rest
}) => {
    const [form] = Form.useForm(outerFormInstance);
    const contextValue = { form, options };

    useEffect(() => {
        if (asyncInitValues) form.resetFields();
    }, [asyncInitValues, form]);

    useBackendErrors(errorsFromBackend, form);

    return (
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form} ref={wrappedRef} {...rest}>
            <StandardFormContext.Provider value={contextValue}>{children}</StandardFormContext.Provider>
        </Form>
    );
};

StandardForm.propTypes = {
    children: PropTypes.node,
    onFinish: PropTypes.func.isRequired,
    onFinishFailed: PropTypes.func,
    options: PropTypes.objectOf(PropTypes.any),
    outerFormInstance: PropTypes.objectOf(PropTypes.any),
    asyncInitValues: PropTypes.objectOf(PropTypes.any),
    errorsFromBackend: PropTypes.objectOf(PropTypes.any),
    wrappedRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }),
    ]),
};

StandardForm.defaultProps = {
    children: null,
    onFinishFailed: Function.prototype,
    options: {},
    outerFormInstance: undefined,
    asyncInitValues: undefined,
    errorsFromBackend: {},
    wrappedRef: null,
};
