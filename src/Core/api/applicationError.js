class ApplicationError extends Error {
    constructor({
        status = '',
        subStatus = 'Unknown error',
        errorContent = {},
        debugData = null,
    }) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this);
        } else {
            this.stack = new Error().stack;
        }

        this.status = status;
        this.subStatus = subStatus;
        this.errorContent = errorContent;
        this.debugData = debugData;
    }
}

export default ApplicationError;
