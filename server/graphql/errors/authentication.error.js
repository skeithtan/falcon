export class AuthenticationError extends Error {
    constructor() {
        super("AuthenticationError: Unable to authenticate user with given credentials");
    }
}