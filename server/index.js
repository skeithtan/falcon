import express from "express";
import config from "./config";

const app = express();

app.get("/", (request, response) => {
    response.send("Hello, World!");
});

app.listen(config.server.port, () => {
    console.info(`Server listening at port ${config.server.port}`);
});