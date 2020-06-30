import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '../constants';

const createErrorMessage = (value, message) => {
    if (!value) {
        return VALIDATION_MESSAGES.REQUIRED;
    }

    return ERROR_MESSAGES[message] || message;
};

export default createErrorMessage;
