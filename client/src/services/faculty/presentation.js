import gql from "graphql-tag";
import { client } from "../../client";


export const fields = `
    _id
    title
    category
    sponsor
    venue
    conference
    medium
    daysDuration
    date {
        month
        year
    }
`;

export const addPresentation = (facultyId, newPresentation) => client.mutate({
    mutation: gql`
        mutation createPresentation($facultyId: ID!, $newPresentation: PresentationInput!) {
            presentation(facultyId: $facultyId) {
                add(newPresentation: $newPresentation) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        newPresentation,
    },
});

export const updatePresentation = (facultyId, _id, newPresentation) => client.mutate({
    mutation: gql`
        mutation updatePresentation($facultyId: ID!, $_id: ID!, $newPresentation: PresentationInput!) {
            presentation(facultyId: $facultyId) {
                update(_id: $_id, newPresentation: $newPresentation) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        _id,
        newPresentation,
    },
});

export const removePresentation = (facultyId, _id) => client.mutate({
    mutation: gql`
        mutation removePresentation($facultyId: ID!, $_id: ID!) {
            presentation(facultyId: $facultyId) {
                remove(_id: $_id)
            }
        }
    `,
    variables: {
        facultyId,
        _id,
    },
});