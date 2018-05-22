import gql from "graphql-tag";
import client from "../../client";


export const fields = `
    _id
    title
    medium
    audience
    usageYear
    level
`;

export function addInstructionalMaterial(facultyId, newInstructionalMaterial) {
    return client.mutate({
        mutation: gql`
            mutation createInstructionalMaterial($facultyId: ID!, $newInstructionalMaterial: InstructionalMaterialInput!) {
                instructionalMaterial(facultyId: $facultyId) {
                    create(newInstructionalMaterial: $newInstructionalMaterial) {
                        ${fields}
                    }
                }
            }
        `,
        variables: {
            facultyId,
            newInstructionalMaterial,
        },
    });
}

export function updateInstructionalMaterial(facultyId, _id, newInstructionalMaterial) {
    return client.mutate({
        mutation: gql`
            mutation updateInstructionalMaterial($facultyId: ID!, $_id: ID!, $newInstructionalMaterial: InstructionalMaterialInput!) {
                instructionalMaterial(facultyId: $facultyId) {
                    update(_id: $_id, newInstructionalMaterial: $newInstructionalMaterial) {
                        ${fields}
                    }
                }
            }
        `,
        variables: {
            facultyId,
            _id,
            newInstructionalMaterial,
        },
    });
}

export function removeInstructionalMaterial(facultyId, _id) {
    return client.mutate({
        mutation: gql`
            mutation removeInstructionalMaterial($facultyId: ID!, $_id: ID!) {
                instructionalMaterial(facultyId: $facultyId) {
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