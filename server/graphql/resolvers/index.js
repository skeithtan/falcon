import {
    queryResolvers as userQueries,
    mutationResolvers as userMutations,
} from "./user.resolver";

import {
    queryResolvers as classQueries,
    mutationResolvers as classMutations,
} from "./class.resolver";


const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
        ...userQueries,
        ...classQueries,
    },
    Mutation: {
        hello: helloWorldResolver,
        ...userMutations,
        ...classMutations,
    },
};