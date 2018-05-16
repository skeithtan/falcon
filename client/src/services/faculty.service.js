import gql from "graphql-tag";
import client from "../client";


const facultySummary = `
    _id
    user {
        name {
            first
            last
        }
    
        email
        photo
    }
`;

const facultyOverview = `
    sex
    employment
    birthDate
`;

const degrees = `
    degrees {
        _id
        title
        level
        completionYear
    }
`;

const recognitions = `
    recognitions {
        _id
        title
        basis
        sponsor
        date {
            month
            year
        }
    }
`;

const teachingSubjects = `
    teachingSubjects {
        _id
        code
        name
        major
    }
`;

const presentations = `
    presentations {
        _id
        title
        category
        sponsor
        venue
        conference
        medium
        daysDuration
        date {
            month
            year
        }
    }
`;

const instructionalMaterials = `
    instructionalMaterials {
        _id
        title
        medium
        classification
        usageYear
        level
        nonPrintType
    }
`;

const extensionWorks = `
    extensionWorks {
        _id
        title
        roles
        venue
    }
`;

const fullFacultyDetails = [
    facultySummary,
    facultyOverview,
    degrees,
    recognitions,
    teachingSubjects,
    presentations,
    instructionalMaterials,
    extensionWorks,
].join("");

export function fetchAllFacultiesSummary() {
    return client.query({
        query: gql`
            query {
                faculties {
                    ${facultySummary}
                }
            }
        `,
    });
}

export function fetchFacultyDetails(facultyId) {
    return client.query({
        query: gql`
            query($id: String!) {
                faculty(_id: $id) {
                    ${fullFacultyDetails}
                }
            }
        `,
        variables: {
            id: facultyId,
        },
    });
}

export function addFaculty(newFaculty, newUser, temporaryPassword) {
    return client.mutate({
        mutation: gql`
            mutation createFaculty($newFaculty: FacultyInput!, $newUser: UserInput!, $temporaryPassword: String!) {
                faculty {
                    createFaculty(newFaculty: $newFaculty, newUser: $newUser, temporaryPassword: $temporaryPassword) {
                        ${fullFacultyDetails}
                    }
                }
            }
        `,
        variables: {
            newFaculty,
            newUser,
            temporaryPassword,
        },
    });
}

export function updateFaculty(_id, newFaculty, newUser) {
    return client.mutate({
        mutation: gql`
            mutation updateFaculty($_id: String!, $newFaculty: FacultyInput!, $newUser: UserInput) {
                faculty {
                    updateFaculty(_id: $_id, newFaculty: $newFaculty, newUser: $newUser) {
                        ${fullFacultyDetails}
                    }
                }
            }
        `,
        variables: {
            _id,
            newFaculty,
            newUser,
        },
    });
}

export function addDegree(facultyId, newDegree) {
    return client.mutate({
        mutation: gql`
            mutation createDegree($facultyId: String!, $newDegree: DegreeInput!) {
                degree(facultyId: $facultyId) {
                    create(newDegree: $newDegree) {
                        _id
                        title
                        level
                        completionYear
                    }
                }
            }
        `,
        variables: {
            facultyId,
            newDegree,
        },
    });
}

export function updateDegree(facultyId, _id, newDegree) {
    return client.mutate({
        mutation: gql`
            mutation updateDegree($facultyId: String!, $_id: String!, $newDegree: DegreeInput!) {
                degree(facultyId: $facultyId) {
                    update(_id: $_id, newDegree: $newDegree) {
                        _id
                        title
                        level
                        completionYear
                    }
                }
            }
        `,
        variables: {
            facultyId,
            _id,
            newDegree,
        },
    });
}