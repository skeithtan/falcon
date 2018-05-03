import {
    queryResolvers as userQueries,
    mutationResolvers as userMutations,
} from "./user.resolver";

import {
    queryResolvers as scheduleQueries,
    mutationResolvers as scheduleMutations,
} from "./schedule.resolver";


const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
        ...userQueries,
        ...scheduleQueries,
    },
    Mutation: {
        hello: helloWorldResolver,
        ...userMutations,
        ...scheduleMutations,
    },
};