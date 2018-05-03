import { AuthorizationError, GuestAccessError } from "../graphql/errors";
import getUserFromToken from "./user_from_token";

export function requireSignIn(resolver) {
    function protectResolver(object, args, context) {
        // All resolvers have access to user because it's been placed in context at server/index.js
        return getUserFromToken(context.authorization)
            .then(() => resolver(object, args, context))
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
                return resolver(object, args, context);
            })
            .catch(() => new GuestAccessError());
    }

    return protectResolver;
}