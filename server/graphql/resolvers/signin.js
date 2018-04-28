import User from "../../models/user";


export default {
    signIn(object, args, context, info) {
        const {email, password} = args;
        //TODO: Return JWT
        return `Welcome, ${email}`;
    },
};