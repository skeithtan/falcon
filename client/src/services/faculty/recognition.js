import gql from "graphql-tag";
import client from "../../client";


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

export function addRecognition(facultyId, newRecognition) {
    return client.mutate({
        mutation: gql`
            mutation createRecognition($facultyId: String!, $newRecognition: RecognitionInput!) {
                recognition(facultyId: $facultyId) {
                    create(newRecognition: $newRecognition) {
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
}

export function updateRecognition(facultyId, _id, newRecognition) {
    return client.mutate({
        mutation: gql`
            mutation updateRecognition($facultyId: String!, $_id: String!, $newRecognition: RecognitionInput!) {
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
}

export function removeRecognition(facultyId, _id) {
    return client.mutate({
        mutation: gql`
            mutation removeRecognition($facultyId: String!, $_id: String!) {
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
}