import User from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config";


export default async function getUserFromToken(authorization) {
    const jwtSecret = config.server.jwtSecret;

    // If authorization header has absolutely nothing
    if (!authorization) {
        return null;
    }

    // Remove bearer from authorization header to retrieve token
    const token = authorization.replace("Bearer ", "");

    const {_id} = jwt.verify(token, jwtSecret);
    return await User.findById(_id).exec();
}