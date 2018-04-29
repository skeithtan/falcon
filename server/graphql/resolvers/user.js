import User from "../../models/user";
import AuthenticationError from "../errors/authentication_error";
import { GraphQLError } from "graphql";


const queryResolvers = {
    async currentUser(object, args, context, info) {
        //TODO: This

        console.log(context, info);

        return null;
    },
};

const mutationResolvers = {
    async signIn(object, args) {
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

export { queryResolvers, mutationResolvers };