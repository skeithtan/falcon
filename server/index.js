import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import mongoose from "mongoose";
import "babel-polyfill"; //Needed for async/await operations

import config from "./config";
import schema from "./graphql/schema";
import getUserFromToken from "./utils/user_from_token";


mongoose.connect(config.database.url)
    .then(onDatabaseConnect)
    .catch(err => console.log(`Could not connect to mongodb: ${err}`));

function onDatabaseConnect() {
    console.log("Connected to database");

    const app = express();

    app.use("/graphql", bodyParser.json(), graphqlExpress(request => {
        return {
            schema: schema,
            context: {
                //In every contexts in every resolvers, the current user should be there
                user: getUserFromToken(request.get("authorization")),
            },
        };
    }));

    app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

    app.listen(config.server.port, () => {
        console.info(`Server listening at port ${config.server.port}`);
    });
}

