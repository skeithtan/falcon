import {
    queryResolvers as userQueryResolvers,
    mutationResolvers as userMutationResolvers,
} from "./user.resolver";


const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
        ...userQueryResolvers,
    },
    Mutation: {
        hello: helloWorldResolver,
        ...userMutationResolvers,
    },
};