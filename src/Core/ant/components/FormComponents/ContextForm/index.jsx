import React, { useEffect } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

import { useBackendErrors } from 'Core/ant/helpers';

export const StandardFormContext = React.createContext({
    form: {},
    options: {},
});

export const StandardForm = ({
    // eslint-disable-next-line react/prop-types
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
    onFinish: PropTypes.func.isRequired,
    onFinishFailed: PropTypes.func,
    options: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    outerFormInstance: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),

    asyncInitValues: PropTypes.shape({
        [PropTypes.string]: PropTypes.any,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    errorsFromBackend: PropTypes.array,
    wrappedRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

StandardForm.defaultProps = {
    onFinishFailed: Function.prototype,
    options: {},
    outerFormInstance: undefined,
    asyncInitValues: undefined,
    errorsFromBackend: [],
    wrappedRef: null,
};
