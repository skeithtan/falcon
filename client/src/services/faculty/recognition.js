import gql from "graphql-tag";
import { client } from "../../client";


export const fields = `
    _id
    title
    basis
    sponsor
    date {
        month
        year
    }
`;

export const addRecognition = (facultyId, newRecognition) => client.mutate({
    mutation: gql`
        mutation createRecognition($facultyId: ID!, $newRecognition: RecognitionInput!) {
            recognition(facultyId: $facultyId) {
                add(newRecognition: $newRecognition) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        newRecognition,
    },
});

export const updateRecognition = (facultyId, _id, newRecognition) => client.mutate({
    mutation: gql`
        mutation updateRecognition($facultyId: ID!, $_id: ID!, $newRecognition: RecognitionInput!) {
            recognition(facultyId: $facultyId) {
                update(_id: $_id, newRecognition: $newRecognition) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        _id,
        newRecognition,
    },
});

export const removeRecognition = (facultyId, _id) => client.mutate({
    mutation: gql`
        mutation removeRecognition($facultyId: ID!, $_id: ID!) {
            recognition(facultyId: $facultyId) {
                remove(_id: $_id)
            }
        }
    `,
    variables: {
        facultyId,
        _id,
    },
});