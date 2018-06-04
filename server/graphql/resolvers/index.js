import { mutationResolvers as classMutations, queryResolvers as classQueries } from "./class.resolver";
import { mutationResolvers as facultyMutations, queryResolvers as facultyQueries } from "./faculty.resolver";
import { mutationResolvers as profileChangesMutations } from "./profile_changes";
import { mutationResolvers as userMutations, queryResolvers as userQueries } from "./user.resolver";


const helloWorldResolver = () => "World";

export const Query = {
    hello: helloWorldResolver,
    ...userQueries,
    ...classQueries,
    ...facultyQueries,
};

export const Mutation = {
    hello: helloWorldResolver,
    ...userMutations,
    ...classMutations,
    ...facultyMutations,
    ...profileChangesMutations,
};
