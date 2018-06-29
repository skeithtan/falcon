export const getChangeRequestFields = objectFields => `
        submitted
        faculty
        subdocumentType
        ${objectFields}
`;

export const changeRequestsForFaculty = (changeRequests, facultyId) =>
    changeRequests.filter(changeRequest => changeRequest.faculty === facultyId);