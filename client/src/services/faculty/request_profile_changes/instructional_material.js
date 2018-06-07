import gql from "graphql-tag";
import { client } from "../../../client";
import { getChangeRequestFields } from "../../../utils/change_request.util";
import { fields as instructionalMaterialFields } from "../instructional_material";


const instructionalMaterialChangeFields = getChangeRequestFields(instructionalMaterialFields);

export const addInstructionalMaterial = newInstructionalMaterial => client.mutate({
    mutation: gql`
        mutation addInstructionalMaterial($newInstructionalMaterial: InstructionalMaterialInput!) {
            requestProfileChanges {
                instructionalMaterials {
                    add(newInstructionalMaterial: $newInstructionalMaterial) {
                        ${instructionalMaterialChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        newInstructionalMaterial,
    },
});

export const updateInstructionalMaterial = (_id, newInstructionalMaterial) => client.mutate({
    mutation: gql`
        mutation updateInstructionalMaterial($_id: ID!, $newInstructionalMaterial: InstructionalMaterialInput!) {
            requestProfileChanges {
                instructionalMaterials {
                    update(_id: $_id, newInstructionalMaterial: $newInstructioanlMaterial) {
                        ${instructionalMaterialChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
        newInstructionalMaterial,
    },
});

export const removeInstructionalMaterial = _id => client.mutate({
    mutation: gql`
        mutation removeInstructionalMaterial($_id: ID!) {
            requestProfileChanges {
                instructionalMaterials {
                    remove(_id: $_id) {
                        ${instructionalMaterialChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
    },
});