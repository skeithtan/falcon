import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import "babel-polyfill"; //Needed for async/await operations
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { schema } from "./graphql/schema";

// Load environmental variables
dotenv.load();

// Format date properly on server responses
Date.prototype.toString = function () {
    return this.toISOString();
};

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_URL,
    DB_PORT,
    APP_PORT,
} = process.env;

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`)
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

    app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

    app.listen(APP_PORT, () => {
        console.info(`Server listening at port ${APP_PORT}`);
    });
}

