import VALIDATION_MESSAGES from './clientValidation';

const ERROR_MESSAGES = (value) => {
    if (!value) {
        return VALIDATION_MESSAGES.REQUIRED;
    }

    return VALIDATION_MESSAGES.INVALID_ENTERED_DATA;
};

export default ERROR_MESSAGES;
