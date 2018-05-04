import {
    queryResolvers as userQueries,
    mutationResolvers as userMutations,
} from "./user.resolver";

import {
    queryResolvers as classQueries,
    mutationResolvers as classMutations,
} from "./class.resolver";

import {
    queryResolvers as facultyQueries,
    mutationResolvers as facultyMutations,
} from "./faculty.resolver";


const helloWorldResolver = () => "World";

export default {
    Query: {
        hello: helloWorldResolver,
        ...userQueries,
        ...classQueries,
        ...facultyQueries,
    },
    Mutation: {
        hello: helloWorldResolver,
        ...userMutations,
        ...classMutations,
        ...facultyMutations,
    },
};