import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

import config from "./config";
import schema from "./graphql/schema";


const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({schema}));
app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

app.listen(config.server.port, () => {
    console.info(`Server listening at port ${config.server.port}`);
});