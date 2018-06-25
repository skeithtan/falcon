import gql from "graphql-tag";
import { client } from "../../client";


export const fetchAllChangeRequests = () => client.query({
    query: gql`
        query {
            profileChangeRequests
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

export const fetchChangeRequestsForFaculty = facultyId => client.query({
    query: gql`
        query($facultyId: ID!) {
            profileChangeRequests(facultyId: $facultyId)
        }
    `,
    variables: {
        facultyId,
    },
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

export const rejectChangeRequest = _id => client.mutate({
    mutation: gql`
        mutation($_id: ID!) {
            reviewProfileChangeRequest(_id: $_id) {
                reject
            }
        }
    `,
    variables: {
        _id,
    },
});