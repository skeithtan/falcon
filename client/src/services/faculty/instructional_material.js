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
            mutation createInstructionalMaterial($facultyId: String!, $newInstructionalMaterial: InstructionalMaterialInput!) {
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
            mutation updateInstructionalMaterial($facultyId: String!, $_id: String!, $newInstructionalMaterial: InstructionalMaterialInput!) {
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
            mutation removeInstructionalMaterial($facultyId: String!, $_id: String!) {
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