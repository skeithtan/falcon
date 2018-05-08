import { GraphQLError } from "graphql/error";

export default class DoesNotExistErorr extends GraphQLError {
    constructor(message) {
        super(`DoesNotExistError: ${message}`);
    }
}