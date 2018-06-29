import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";
import { requireSignIn } from "../../utils/user_decorator";
import { getUserFromContext } from "../../utils/user_from_context";
import { AuthenticationError } from "../errors/authentication.error";
import { DoesNotExistError } from "../errors/does_not_exist.error";


function currentUser(object, args, context) {
    return getUserFromContext(context);
}

async function signIn(object, {email, password}) {
    const user = await User.findOne({email: email}).exec();

    if (!user) {
        throw new AuthenticationError();
    }

    const isValidPassword = user.comparePassword(password);
    if (!isValidPassword) {
        throw new AuthenticationError();
    }

    const token = jwt.sign({
        _id: user._id,
    }, process.env.APP_JWT_SECRET);

    return {
        token: token,
        name: user.name,
        email: user.email,
        photo: user.photo,
        authorization: user.authorization,
        temporaryPassword: user.password.temporary,
    };
}

function updateUser(object, {_id, newUser}) {
    return User.findByIdAndUpdate(_id, newUser, {new: true})
               .exec()
               .catch(() => {
                   return new DoesNotExistError(`User of ID ${_id} does not exist.`);
               });
}

function changeCurrentUserPassword(object, {newPassword}, context) {
    return getUserFromContext(context)
        .then(user => {
            user.password = {
                secret: newPassword,
                temporary: false,
            };
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