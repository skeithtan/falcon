import { GraphQLError } from "graphql/error";

export default class DoesNotExistError extends GraphQLError {
    constructor(message) {
        super(`DoesNotExistError: ${message}`);
    }
}