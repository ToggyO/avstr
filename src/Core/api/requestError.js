export default class RequestError extends Error {
    constructor(message, type) {
        super(message);
        this.name = 'RequestError';
        this.type = type;
    }
}
