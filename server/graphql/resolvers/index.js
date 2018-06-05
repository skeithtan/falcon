import { mutationResolvers as classMutations, queryResolvers as classQueries } from "./class.resolver";
import { mutationResolvers as facultyMutations, queryResolvers as facultyQueries } from "./faculty.resolver";
import { mutationResolvers as requestProfileChangesMutations } from "./request_profile_changes.resolver";
import { mutationResolvers as reviewProfileChangesMutations } from "./review_profile_changes.resolver";
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
    ...requestProfileChangesMutations,
    ...reviewProfileChangesMutations,
};
