export class ValidationError extends Error {
    constructor(error) {
        super(`ValidationError: ${error}`);
    }
}