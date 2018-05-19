import gql from "graphql-tag";
import client from "../../client";


export const fields = `
    _id
    title
    level
    completionYear
`;

export function addDegree(facultyId, newDegree) {
    return client.mutate({
        mutation: gql`
            mutation createDegree($facultyId: String!, $newDegree: DegreeInput!) {
                degree(facultyId: $facultyId) {
                    create(newDegree: $newDegree) {
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
}

export function updateDegree(facultyId, _id, newDegree) {
    return client.mutate({
        mutation: gql`
            mutation updateDegree($facultyId: String!, $_id: ID!, $newDegree: DegreeInput!) {
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
}

export function removeDegree(facultyId, _id) {
    return client.mutate({
        mutation: gql`
            mutation removeDegree($facultyId: String!, $_id: ID!) {
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
}