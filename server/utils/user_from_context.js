import jwt from "jsonwebtoken";
import config from "../config";
import { GuestAccessError } from "../graphql/errors";
import { User } from "../models/user.model";

function getAuthorizationFromContext(context) {
    return new Promise((resolve, reject) => {
        if (context.authorization) {
            resolve(context.authorization);
        } else {
            reject(new GuestAccessError());
        }
    });
}

function getUserIdFromAuthorization(authorization) {
    // Remove bearer from authorization header to retrieve token
    const token = authorization.replace("Bearer ", "");
    const jwtSecret = config.server.jwtSecret;
    return new Promise((resolve, reject) => {
        try {
            const {_id} = jwt.verify(token, jwtSecret);
            resolve(_id);
        } catch (error) {
            reject(new Error(`JWTValidationError: ${error.message}`));
        }
    });
}


// Ensures authorization is in the header, else throws GuestAccessError
// Ensures JWT is valid, else throws JWTValidationError
export function getUserFromContext(context) {
    return getAuthorizationFromContext(context)
        .then(authorization => getUserIdFromAuthorization(authorization))
        .then(_id => User.findById({_id}).exec());
}

