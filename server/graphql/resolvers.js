import {
    queryResolvers as userQueryResolvers,
    mutationResolvers as userMutationResolvers,
} from "./resolvers/user";


const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
        ...userQueryResolvers
    },
    Mutation: {
        hello: helloWorldResolver,
        ...userMutationResolvers,
    },
};