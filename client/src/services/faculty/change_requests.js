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