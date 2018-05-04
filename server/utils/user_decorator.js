import { AuthorizationError, GuestAccessError } from "../graphql/errors";
import getUserFromToken from "./user_from_token";

export function requireSignIn(resolver) {
    function protectResolver(object, args, context) {
        // All resolvers have access to user because it's been placed in context at server/index.js
        return getUserFromToken(context.authorization)
            .then(() => {
                try {
                    // Without try-catch, an exception thrown in the resolver returns a GuestAccessError
                    return resolver(object, args, context);
                } catch (error) {
                    console.log("Error occurred in resolver", error.message);
                    throw error;
                }
            })
            .catch(() => new GuestAccessError());
    }

    return protectResolver;
}

export function limitAccess(resolver, {allowed, action}) {
    function protectResolver(object, args, context) {

        return getUserFromToken(context.authorization)
            .then(user => {
                const authorization = user.authorization;
                if (!allowed.includes(authorization)) {
                    return new AuthorizationError(authorization, action);
                }

                try {
                    return resolver(object, args, context);
                } catch (error) {
                    console.log("Error occurred in resolver", error.message);
                    throw error;
                }
            })
            .catch(() => new GuestAccessError());
    }

    return protectResolver;
}