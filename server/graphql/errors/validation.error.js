import { GraphQLError } from "graphql/error";


export default class ValidationError extends GraphQLError {
    constructor(error) {
        super(`ValidationError: ${error}`);
    }
}