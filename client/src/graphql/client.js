import ApolloClient, { HttpLink, ApolloLink, concat } from "apollo-boost";


const httpLink = new HttpLink({
    uri: "https://localhost:8000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: `Bearer ${localStorage.token}` || null,
        },
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
});

export default client;