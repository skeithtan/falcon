import gql from "graphql-tag";
import { client } from "../../../client";
import { getChangeRequestFields } from "../../../utils/change_request.util";
import { fields as extensionWorkFields } from "../extension_work";


const extensionWorkChangeFields = getChangeRequestFields(extensionWorkFields);

export const addExtensionWork = newExtensionWork => client.mutate({
    mutation: gql`
        mutation addExtensionWork($newExtensionWork: ExtensionWorkInput!) {
            requestProfileChanges {
                extensionWorks {
                    add(newExtensionWork: $newExtensionWork) {
                        ${extensionWorkChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        newExtensionWork,
    },
});

export const updateExtensionWork = (_id, newExtensionWork) => client.mutate({
    mutation: gql`
        mutation updateExtensionWork($_id: ID!, $newExtensionWork: ExtensionWorkInput!) {
            requestProfileChanges {
                extensionWorks {
                    update(_id: $_id, newExtensionWork: $newExtensionWork) {
                        ${extensionWorkChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
        newExtensionWork,
    },
});

export const removeExtensionWork = _id => client.mutate({
    mutation: gql`
        mutation removeExtensionWork($_id: ID!) {
            requestProfileChanges {
                extensionWorks {
                    remove(_id: $_id) {
                        ${extensionWorkChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
    },
});