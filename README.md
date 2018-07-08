<p align="center"><img src="Falcon/long_logo.png" alt="falcon" height="160px"></p>

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
The configuration file is not a part of this repository because it contains the database username and password, but this configuration file can be replicated. The module `dotenv` loads the `.env` file into `process.env`. The `.env` file has the following structure:

```
APP_PORT=
APP_JWT_SECRET=""

DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
DB_URL=""
DB_PORT=

```
