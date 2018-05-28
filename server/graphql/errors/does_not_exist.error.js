export class DoesNotExistError extends Error {
    constructor(message) {
        super(`DoesNotExistError: ${message}`);
    }
}