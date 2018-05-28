import { GraphQLError } from "graphql/error";


export class DoesNotExistError extends GraphQLError {
    constructor(message) {
        super(`DoesNotExistError: ${message}`);
    }
}