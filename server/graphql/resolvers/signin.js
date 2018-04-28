import User from "../../models/user";
import AuthenticationError from "../errors/authentication_error";
import { GraphQLError } from "graphql";


export default {
    async signIn(object, args, context, info) {
        const {email, password} = args;

        console.log("Finding user");
        const user = await User.findOne({email: email}).exec();
        console.log(user);

        if (!user) {
            throw new AuthenticationError();
        }

        const isValidPassword = user.comparePassword(password);
        console.log(isValidPassword);

        if (!isValidPassword) {
            throw new AuthenticationError();
        }

        //TODO: MakeJWT

        //TODO: Return JWT
        return `Welcome, ${email}`;

    },
};