export class AuthorizationError extends Error {
    constructor(userType, action) {
        super(`AuthorizationError: User of type ${userType} is not authorized to perform ${action}`);
    }
}