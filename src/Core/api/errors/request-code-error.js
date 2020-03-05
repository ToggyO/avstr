export default class RequestCodeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AccessError';
    }
}
