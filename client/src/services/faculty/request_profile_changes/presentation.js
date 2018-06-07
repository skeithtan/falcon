import gql from "graphql-tag";
import { client } from "../../../client";
import { getChangeRequestFields } from "../../../utils/change_request.util";
import { fields as presentationFields } from "../presentation";


const presentationChangeFields = getChangeRequestFields(presentationFields);

export const addPresentation = newPresentation => client.mutate({
    mutation: gql`
        mutation addPresentation($newPresentation: PresentationInput!) {
            requestProfileChanges {
                presentations {
                    add(newPresentation: $newPresentation) {
                        ${presentationChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        newPresentation,
    },
});

export const updatePresentation = (_id, newPresentation) => client.mutate({
    mutation: gql`
        mutation updatePresentation($_id: ID!, $newPresentation: PresentationInput!) {
            requestProfileChanges {
                presentations {
                    update(_id: $_id, newPresentation: $newPresentation) {
                        ${presentationChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
        newPresentation,
    },
});

export const removePresentation = _id => client.mutate({
    mutation: gql`
        mutation removePresentation($_id: ID!) {
            requestProfileChanges {
                presentations {
                    remove(_id: $_id) {
                        ${presentationChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
    },
});