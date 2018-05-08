import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";


const httpLink = new HttpLink({uri: "/graphql"});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.token}` || null,
        },
    });

    return forward(operation);
});

const errorMiddleware = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({message, location, path}) => {
            console.log(
                `GraphQL Error: Message: ${message}, Location: ${location}, Path: ${path}`,
            );
        });
    }

    if (networkError) {
        console.log(`Network Error: ${networkError}`);
    }
});

const client = new ApolloClient({
    //httpLink MUST be the last in the array otherwise it won't work
    link: from([authMiddleware, errorMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

export default client;