export default class RequestError extends Error {
    constructor(message, type, content) {
        super(message);
        this.name = 'RequestError';
        this.type = type;
        this.content = content;
    }
}
