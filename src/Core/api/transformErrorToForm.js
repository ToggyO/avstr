import createErrorMessage from 'Core/api/createErrorMessage';

const transformErrorToForm = (
    errors,
    { getFieldValue, isFieldTouched, isFieldValidating },
) => Object.keys(errors).reduce((acc, key) => {
    if (!key) return false;
    const convertedField = `${key[0].toLocaleLowerCase()}${key.slice(1)}`;
    const value = getFieldValue(convertedField);
    const touched = isFieldTouched(convertedField);
    const validating = isFieldValidating(convertedField);
    const errorObj = {
        name: convertedField,
        value,
        touched,
        validating,
        errors: [createErrorMessage(value, errors[key][0])],
    };
    acc.push(errorObj);
    return acc;
}, []);

export default transformErrorToForm;
