import gql from "graphql-tag";
import client from "../../client";


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

export function addPresentation(facultyId, newPresentation) {
    return client.mutate({
        mutation: gql`
            mutation createPresentation($facultyId: ID!, $newPresentation: PresentationInput!) {
                presentation(facultyId: $facultyId) {
                    create(newPresentation: $newPresentation) {
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
}

export function updatePresentation(facultyId, _id, newPresentation) {
    return client.mutate({
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
}

export function removePresentation(facultyId, _id) {
    return client.mutate({
        mutation: gql`
            mutation removePresentation($facultyId: ID!, $_id: ID!) {
                presentation(facultyId: $facultyId) {
                    remove(_id: $_id)
                }
            }
        `,
        variables: {
            facultyId,
            _id
        }
    })
}