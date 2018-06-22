import { AuthorizationError } from "../graphql/errors/authorization.error";
import { ASSOCIATE_DEAN, CLERK, DEAN, FACULTY } from "../models/user.model";
import { getUserFromContext } from "./user_from_context";


export const NO_FACULTY = [DEAN, ASSOCIATE_DEAN, CLERK];
export const AUTHENTICATED_USERS = [FACULTY, DEAN, ASSOCIATE_DEAN, CLERK];

export function requireSignIn(resolver) {
    return (object, args, context) =>
        getUserFromContext(context)
            .then(() => resolver(object, args, context));

}

export function limitAccess(resolver, {allowed, action}) {
    return (object, args, context, info) =>
        getUserFromContext(context)
            .then(user => {
                const authorization = user.authorization;
                if (!allowed.includes(authorization)) {
                    throw new AuthorizationError(authorization, action);
                }
            })
            .then(() => resolver(object, args, context, info));
}