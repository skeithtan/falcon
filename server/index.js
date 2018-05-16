import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import "babel-polyfill"; //Needed for async/await operations
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import config from "./config";
import schema from "./graphql/schema";


// Format date properly on server responses
Date.prototype.toString = function () {
    return this.toISOString();
};

const {server, database} = config;

mongoose.connect(database.url, database.options)
        .then(onDatabaseConnect)
        .catch(err => console.log(`Could not connect to mongodb: ${err}`));

function onDatabaseConnect() {
    console.log("Connected to database");
    const app = express();

    app.use("/graphql", bodyParser.json(), graphqlExpress(request => {
        return {
            schema: schema,
            context: {
                authorization: request.get("authorization"),
            },
        };
    }));

    app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));

    app.listen(server.port, () => {
        console.info(`Server listening at port ${server.port}`);
    });
}

