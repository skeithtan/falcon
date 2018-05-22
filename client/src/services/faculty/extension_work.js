import gql from "graphql-tag";
import client from "../../client";


export const fields = `
    _id
    title
    roles
    venue
`;

export function addExtensionWork(facultyId, newExtensionWork) {
    return client.mutate({
        mutation: gql`
            mutation createExtensionWork($facultyId: ID!, $newExtensionWork: ExtensionWorkInput!) {
                extensionWork(facultyId: $facultyId) {
                    create(newExtensionWork: $newExtensionWork) {
                        ${fields}
                    }
                }
            }
        `,
        variables: {
            facultyId,
            newExtensionWork,
        },
    });
}

export function updateExtensionWork(facultyId, _id, newExtensionWork) {
    return client.mutate({
        mutation: gql`
            mutation updateExtensionWork($facultyId: ID!, $_id: ID!, $newExtensionWork: ExtensionWorkInput!) {
                extensionWork(facultyId: $facultyId) {
                    update(_id: $_id, newExtensionWork: $newExtensionWork) {
                        ${fields}
                    }
                }
            }
        `,
        variables: {
            facultyId,
            _id,
            newExtensionWork,
        },
    });
}

export function removeExtensionWork(facultyId, _id) {
    return client.mutate({
        mutation: gql`
            mutation removeExtensionWork($facultyId: ID!, $_id: ID!) {
                extensionWork(facultyId: $facultyId) {
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