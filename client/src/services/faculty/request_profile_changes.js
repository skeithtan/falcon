import gql from "graphql-tag";
import { client } from "../../client";
import { getChangeRequestFields } from "../../utils/change_request.util";
import { fields as degreeFields } from "./degree";
import { fields as extensionWorkFields } from "./extension_work";
import { fields as instructionalMaterialFields } from "./instructional_material";
import { fields as presentationFields } from "./presentation";
import { fields as recognitionFields } from "./recognition";


export const requestAddDegree = newDegree => client.mutate({
    mutation: gql`
        mutation($newDegree: DegreeInput!) {
            requestProfileChange {
                degree {
                    add(newDegree: $newDegree) {
                        ${getChangeRequestFields(degreeFields)}
                    }
                }
            }
        }
    `,
    variables: {
        newDegree,
    },
});

export const requestAddRecognition = newRecognition => client.mutate({
    mutation: gql`
        mutation($newRecognition: RecognitionInput!) {
            requestProfileChange {
                recognition {
                    add(newRecognition: $newRecognition) {
                        ${getChangeRequestFields(recognitionFields)}
                    }
                }
            }
        }
    `,
    variables: {
        newRecognition,
    },
});

export const requestAddPresentation = newPresentation => client.mutate({
    mutation: gql`
        mutation($newPresentation: PresentationInput!) {
            requestProfileChange {
                presentation {
                    add(newPresentation: $newPresentation) {
                        ${getChangeRequestFields(presentationFields)}
                    }
                }
            }
        }
    `,
    variables: {
        newPresentation,
    },
});

export const requestAddInstructionalMaterial = newInstructionalMaterial => client.mutate({
    mutation: gql`
        mutation($newInstructionalMaterial: InstructionalMaterialInput!) {
            requestProfileChange {
                instructionalMaterial {
                    add(newInstructionalMaterial: $newInstructionalMaterial) {
                        ${getChangeRequestFields(instructionalMaterialFields)}
                    }
                }
            }
        }
    `,
    variables: {
        newInstructionalMaterial,
    },
});

export const requestAddExtensionWork = newExtensionWork => client.mutate({
    mutation: gql`
        mutation($newExtensionWork: ExtensionWorkInput!) {
            requestProfileChange {
                extensionWork {
                    add(newExtensionWork: $newExtensionWork) {
                        ${getChangeRequestFields(extensionWorkFields)}
                    }
                }
            }
        }
    `,
    variables: {
        newExtensionWork,
    },
});

export const deleteChangeRequest = _id => client.mutate({
    mutation: gql`
        mutation($_id: ID!) {
            requestProfileChange {
                deleteChangeRequest(_id: $_id)
            }
        }
    `,
    variables: {
        _id,
    },
});