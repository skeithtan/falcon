import jwt from "jsonwebtoken";
import config from "../config";
import { GuestAccessError } from "../graphql/errors";
import User from "../models/user.model";

function getAuthorizationFromContext(context) {
    return new Promise((resolve, reject) => {
        try {
            return resolve(context.authorization);
        } catch (error) {
            reject(error);
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
            reject(error);
        }
    });
}


// Ensures authorization is in the header, else throws GuestAccessError
// Ensures JWT is valid, else throws JWTValidationError
// Ensures User is in database, else throws UserNotFoundError
export function getUserFromContext(context) {
    return getAuthorizationFromContext(context)
        .catch(() => {
            throw GuestAccessError();
        })
        .then(authorization => getUserIdFromAuthorization(authorization))
        .catch(error => {
            throw Error(`JWTValidationError: ${error.message}`);
        })
        .then(_id => User.findById({_id}).exec())
        .catch(() => {
            throw Error("UserNotFoundError: User with ID was not found in the database");
        });
}

