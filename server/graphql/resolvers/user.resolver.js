import User from "../../models/user.model";
import AuthenticationError from "../errors/authentication.error";
import jwt from "jsonwebtoken";
import config from "../../config";


const queryResolvers = {
    async currentUser(object, args, context) {
        return context.user;
    },
};

const mutationResolvers = {
    async signIn(object, {email, password}) {
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
            email: user.email,
            name: user.name,
            photo: user.photo,
            authorization: user.authorization,
        }, config.server.jwtSecret);

        return token;
    },
};

export { queryResolvers, mutationResolvers };