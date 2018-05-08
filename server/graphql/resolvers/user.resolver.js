import jwt from "jsonwebtoken";

import { User } from "../../models/user.model";
import { requireSignIn } from "../../utils/user_decorator";
import { AuthenticationError, DoesNotExistError } from "../errors";
import { getUserFromContext } from "../../utils/user_from_context";
import config from "../../config";

function currentUser(object, args, context) {
    return getUserFromContext(context);
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

function updateUser(object, {_id, newUser}) {
    return User.findByIdAndUpdate(_id, newUser, {new: true})
               .exec()
               .catch(() => {
                   return new DoesNotExistError(`User of id ${_id} does not exist.`);
               });
}

function changeCurrentUserPassword(object, {newPassword}, context) {
    return getUserFromContext(context)
        .then(user => {
            user.secret = newPassword;
            // Return true because return type is Boolean, true meaning success
            // Errors will not return false, instead an error array from this uncaught promise
            return user.save().then(() => true);
        });
}

export const queryResolvers = {
    currentUser: requireSignIn(currentUser),
};

export const mutationResolvers = {
    signIn,
    updateUser,
    changeCurrentUserPassword,
};