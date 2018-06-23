import GraphQLJSON from "graphql-type-json";
import { mutationResolvers as classMutations, queryResolvers as classQueries } from "./class.resolver";
import { mutationResolvers as facultyMutations, queryResolvers as facultyQueries } from "./faculty.resolver";
import { mutationResolvers as requestProfileChangesMutations } from "./request_profile_changes.resolver";
import {
    mutationResolvers as reviewProfileChangesMutations,
    queryResolvers as profileChangesQueries,
} from "./review_profile_changes.resolver";
import { mutationResolvers as userMutations, queryResolvers as userQueries } from "./user.resolver";


const helloWorldResolver = () => "World";

const Query = {
    hello: helloWorldResolver,
    ...userQueries,
    ...classQueries,
    ...facultyQueries,
    ...profileChangesQueries,
};

const Mutation = {
    hello: helloWorldResolver,
    ...userMutations,
    ...classMutations,
    ...facultyMutations,
    ...requestProfileChangesMutations,
    ...reviewProfileChangesMutations,
};

const typeDefs = {
    JSON: GraphQLJSON,
};

export const resolvers = {
    Query,
    Mutation,
    ...typeDefs,
};