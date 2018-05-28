export class GuestAccessError extends Error {
    constructor() {
        super("GuestAccessError: This section of the API requires authentication");
    }
}