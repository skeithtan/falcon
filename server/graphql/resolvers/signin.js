import User from "../../models/user";
import AuthenticationError from "../errors/authentication_error";
import { GraphQLError } from "graphql";


export default {
    async signIn(object, args, context, info) {
        const {email, password} = args;
        const user = await User.findOne({email: email}).exec();

        if (!user) {
            throw new AuthenticationError();
        }

        const isValidPassword = user.comparePassword(password);

        if (!isValidPassword) {
            throw new AuthenticationError();
        }

        //TODO: MakeJWT

        //TODO: Return JWT
        return `Welcome, ${email}`;

    },
};