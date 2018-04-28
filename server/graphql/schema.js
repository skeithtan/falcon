import { makeExecutableSchema } from "graphql-tools";

import signInType from "./types/signin";
import resolvers from "./resolvers";


const rootQuery = `
    type Query {
        hello: String
    }
`;

export default makeExecutableSchema({
    typeDefs: [rootQuery, signInType],
    resolvers: resolvers,
});
