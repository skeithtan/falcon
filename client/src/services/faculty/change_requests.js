import gql from "graphql-tag";
import { client } from "../../client";


export const fetchAllPendingChangeRequests = () => client.query({
    query: gql`
        query {
            profileChangeRequests(status: PENDING)
        }
    `,
});

export const fetchMyChangeRequests = () => client.query({
    query: gql`
        query {
            myChangeRequests
        }
    `,
});

export const approveChangeRequest = _id => client.mutate({
    mutation: gql`
        mutation($_id: ID!) {
            reviewProfileChangeRequest(_id: $_id) {
                approve
            }
        }
    `,
    variables: {
        _id,
    },
});

export const rejectChangeRequest = (_id, rejectionReason) => client.mutate({
    mutation: gql`
        mutation($_id: ID!, $rejectionReason: String!) {
            reviewProfileChangeRequest(_id: $_id) {
                reject(reason: $rejectionReason)
            }
        }
    `,
    variables: {
        _id,
        rejectionReason
    },
});