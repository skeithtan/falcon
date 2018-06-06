export function getChangeRequestFields(objectFields) {
    return `
        _id
        submitted
        action
        changeObjectId
        object {
            ${objectFields}
        }
    `
}