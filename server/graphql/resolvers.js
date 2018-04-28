import signInResolver from "./resolvers/signin";


export default {
    Query: {
        hello: () => {
            return "World";
        },

        ...signInResolver,
    },
};