import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config";


export default async function getUserFromToken(authorization) {
    // If authorization header has absolutely nothing
    if (!authorization) {
        return null;
    }

    // Remove bearer from authorization header to retrieve token
    const token = authorization.replace("Bearer ", "");
    const jwtSecret = config.server.jwtSecret;

    try {
        const {_id} = jwt.verify(token, jwtSecret);
        return await User.findById(_id).exec();
    } catch (error) {
        console.log(`An error occurred verifying JWT Token: ${error.message}`);
        throw error;
    }
}