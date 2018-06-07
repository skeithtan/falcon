import gql from "graphql-tag";
import { client } from "../../../client";
import { getChangeRequestFields } from "../../../utils/change_request.util";
import { fields as recognitionFields } from "../recognition";


const recognitionChangeFields = getChangeRequestFields(recognitionFields);

export const addRecognition = newRecognition => client.mutate({
    mutation: gql`
        mutation addRecognition($newRecognition: RecognitionInput!) {
            requestProfileChanges {
                recognitions {
                    add(newRecognition: $newRecognition) {
                        ${recognitionChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        newRecognition,
    },
});

export const updateRecognition = (_id, newRecognition) => client.mutate({
    mutation: gql`
        mutation updateRecognition($_id: ID!, $newRecognition: RecognitionInput!) {
            requestProfileChanges {
                recognitions {
                    update(_id: $_id, newRecognition: $newRecognition) {
                        ${recognitionChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
        newRecognition,
    },
});

export const removeRecognition = _id => client.mutate({
    mutation: gql`
        mutation removeRecognition($_id: ID!) {
            requestProfileChanges {
                recognitions {
                    remove(_id: $_id) {
                        ${recognitionChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
    },
});