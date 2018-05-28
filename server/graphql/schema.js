import { makeExecutableSchema } from "graphql-tools";
import requireText from "require-text";
import { Query, Mutation } from "./resolvers";


const rootQuery = requireText("./schema.graphql", require);
const extensionTypes = ["user", "class", "faculty"];
const types = ["date", ...extensionTypes];

const typeDefinitions = types
    .map(type => `${type}.type.graphql`) // Transform type to fileName
    .map(fileName => `./types/${fileName}`) // Transform fileName to path
    .map(path => requireText(path, require)); // Get file contents as string

const queryExtensions = extensionTypes
    .map(type => `${type}.query.graphql`)
    .map(fileName => `./query_extensions/${fileName}`)
    .map(path => requireText(path, require));

const mutationExtensions = extensionTypes
    .map(type => `${type}.mutation.graphql`)
    .map(fileName => `./mutation_extensions/${fileName}`)
    .map(path => requireText(path, require));

export const schema = makeExecutableSchema({
    typeDefs: [rootQuery, ...typeDefinitions, ...queryExtensions, ...mutationExtensions],
    resolvers: { Query, Mutation },
});
