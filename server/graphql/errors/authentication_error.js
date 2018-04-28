import { GraphQLError } from "graphql";


export default class AuthenticationError extends GraphQLError {
    constructor() {
        super("Unable to authenticate user with given credentials");
    }
}