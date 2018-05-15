# The Falcon Innovation Project

An innovation project for Philippine Normal University's Faculty of Arts and Languages that schedules faculty, stores faculty profiles, and visualizes tracer study results.

Falcon's server is designed to run on the Node.js runtime environment. It uses express as the web framework to handle HTTP requests and responses. MongoDB facilitates the database layer, with Mongoose as the Object Document Mapper. Instead of using the traditional REST API approach for communicating with the client, Falcon uses GraphQL.

The client part of Falcon uses React to translate the app's internal state to a view, Redux to manage the state, and Material UI as the design language and component library.

### Run Instructions

To buid the server files, simply enter the following and babel should compile the server files to `/dist/`:
```
npm run-script build 
```

Then start the server:
```
npm start
```

### Configuration file
The configuration file is not a part of this repository because it contains the database username and password, but this configuration file can be replicated. It is located in `/server/config.js` and has the following structure:

```
export default {
    server: {
        port: 8000,
        jwtSecret: "" //JWT Secret
    },
    database: {
        username: "",
        password: "",
        name: "",
        get url() {
            return `` //Create a URL using this.username, this.password and this.name
        },
        // Prevents Topology was destroyed errors
        // Recommended by StackOverflow: https://stackoverflow.com/a/33163368
        mongooseOptions: {
            server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
            replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
        },
    },
};
```
