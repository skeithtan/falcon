import { mutationResolvers as classMutations, queryResolvers as classQueries } from "./class.resolver";
import { mutationResolvers as facultyMutations, queryResolvers as facultyQueries } from "./faculty.resolver";
import { mutationResolvers as userMutations, queryResolvers as userQueries } from "./user.resolver";


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