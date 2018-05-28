import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";


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
        graphQLErrors.forEach(({message, ...details}) =>
            console.log(`GraphQL Error: Message: ${message}`, details),
        );
    }

    if (networkError) {
        console.log("Network Error: ", networkError);
    }
});
export const client = new ApolloClient({
    //httpLink MUST be the last in the array otherwise it won't work
    link: from([authMiddleware, errorMiddleware, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "network-only",
            errorPolicy: "ignore",
        },
        query: {
            fetchPolicy: "network-only",
            errorPolicy: "all",
        },
    },
});