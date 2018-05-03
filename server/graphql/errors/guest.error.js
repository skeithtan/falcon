import { GraphQLError } from "graphql/error";

export default class GuestAccessError extends GraphQLError {
    constructor() {
        super("GuestAccessError: This section of the API requires authentication");
    }
}