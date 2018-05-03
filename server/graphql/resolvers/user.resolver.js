import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import { requireSignIn } from "../../utils/user_decorator";
import getUserFromToken from "../../utils/user_from_token";
import { AuthenticationError } from "../errors";
import config from "../../config";

function currentUser(object, args, context) {
    return getUserFromToken(context.authorization);
}

async function signIn(object, {email, password}) {
    const user = await User.findOne({email: email}).exec();

    if (!user) {
        return new AuthenticationError();
    }

    const isValidPassword = user.comparePassword(password);

    if (!isValidPassword) {
        return new AuthenticationError();
    }

    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
        authorization: user.authorization,
    }, config.server.jwtSecret);

    return token;
}

const queryResolvers = {
    currentUser: requireSignIn(currentUser),
};

const mutationResolvers = {
    signIn,
};

export { queryResolvers, mutationResolvers };