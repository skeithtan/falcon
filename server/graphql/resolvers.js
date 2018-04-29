import signInResolver from "./resolvers/signin";

const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
    },
    Mutation: {
        hello: helloWorldResolver,
        ...signInResolver,
    }
};