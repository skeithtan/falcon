import requireText from "require-text";
import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";


const rootQuery = requireText("./schema.graphql", require);
const types = ["date", "faculty", "class", "user"];
const queryExtensionTypes = ["user", "class"];
const mutationExtensionTypes = ["user", "class"];

const typeDefinitions = types
    .map(type => `${type}.type.graphql`) // Transform type to fileName
    .map(fileName => `./types/${fileName}`) // Transform fileName to path
    .map(path => requireText(path, require)); // Get file contents as string

const queryExtensions = queryExtensionTypes
    .map(type => `${type}.query.graphql`)
    .map(fileName => `./query_extensions/${fileName}`)
    .map(path => requireText(path, require));

const mutationExtensions = mutationExtensionTypes
    .map(type => `${type}.mutation.graphql`)
    .map(fileName => `./mutation_extensions/${fileName}`)
    .map(path => requireText(path, require));

export default makeExecutableSchema({
    typeDefs: [rootQuery, ...typeDefinitions, ...queryExtensions, ...mutationExtensions],
    resolvers: resolvers,
});
