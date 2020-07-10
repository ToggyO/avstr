const trimFormValues = (values = {}) => Object.entries(values).reduce(
    (acc, [key, val]) => ({
        ...acc,
        [key]: (val || '').trim(),
    }),
    {},
);

export default trimFormValues;
