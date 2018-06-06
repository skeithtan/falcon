import gql from "graphql-tag";
import { client } from "../../client";


export const fields = `
    _id
    title
    level
    completionYear
`;

export const addDegree = (facultyId, newDegree) => client.mutate({
    mutation: gql`
        mutation createDegree($facultyId: ID!, $newDegree: DegreeInput!) {
            degree(facultyId: $facultyId) {
                add(newDegree: $newDegree) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        newDegree,
    },
});

export const updateDegree = (facultyId, _id, newDegree) => client.mutate({
    mutation: gql`
        mutation updateDegree($facultyId: ID!, $_id: ID!, $newDegree: DegreeInput!) {
            degree(facultyId: $facultyId) {
                update(_id: $_id, newDegree: $newDegree) {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        facultyId,
        _id,
        newDegree,
    },
});

export const removeDegree = (facultyId, _id) => client.mutate({
    mutation: gql`
        mutation removeDegree($facultyId: ID!, $_id: ID!) {
            degree(facultyId: $facultyId) {
                remove(_id: $_id)
            }
        }
    `,
    variables: {
        facultyId,
        _id,
    },
});
