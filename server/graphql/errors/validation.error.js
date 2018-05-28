import { GraphQLError } from "graphql/error";


export class ValidationError extends GraphQLError {
    constructor(error) {
        super(`ValidationError: ${error}`);
    }
}