import gql from "graphql-tag";
import { client } from "../../client";
import { fields as degreeFields } from "./degree";
import { fields as extensionWorkFields } from "./extension_work";
import { fields as instructionalMaterialFields } from "./instructional_material";
import { fields as presentationFields } from "./presentation";
import { fields as recognitionFields } from "./recognition";


const facultySummary = `
    _id
    idNumber
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
        ${degreeFields}
    }
`;

const recognitions = `
    recognitions {
        ${recognitionFields}
    }
`;

const presentations = `
    presentations {
        ${presentationFields}
    }
`;
const instructionalMaterials = `
    instructionalMaterials {
        ${instructionalMaterialFields}
    }
`;
const extensionWorks = `
    extensionWorks {
        ${extensionWorkFields}
    }
`;

// TeachingSubjects is [ID!]!
const teachingSubjects = `
    teachingSubjects
`;

const fullFacultyDetails = [
    facultySummary,
    facultyOverview,
    degrees,
    recognitions,
    presentations,
    instructionalMaterials,
    extensionWorks,
    teachingSubjects,
].join("");

export const fetchAllFaculties = () => client.query({
    query: gql`
        query {
            faculties {
                ${fullFacultyDetails}
            }
        }
    `,
});

export const fetchMyProfile = () => client.query({
    query: gql`
        query {
            myProfile {
                ${fullFacultyDetails}
            }
        }
    `,
});

export const addFaculty = (newFaculty, newUser, temporaryPassword) => client.mutate({
    mutation: gql`
        mutation($newFaculty: FacultyInput!, $newUser: UserInput!, $temporaryPassword: String!) {
            faculty {
                add(newFaculty: $newFaculty, newUser: $newUser, temporaryPassword: $temporaryPassword) {
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

export const updateFaculty = (_id, newFaculty, newUser) => client.mutate({
    mutation: gql`
        mutation($_id: ID!, $newFaculty: FacultyInput!, $newUser: UserInput) {
            faculty {
                update(_id: $_id, newFaculty: $newFaculty, newUser: $newUser) {
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

export const resetFacultyPassword = (_id, newPassword) => client.mutate({
    mutation: gql`
        mutation($_id: ID!, $newPassword: String!) {
            faculty {
                resetPassword(_id: $_id, newPassword: $newPassword)
            }
        }
    `,
    variables: {
        _id,
        newPassword,
    },
});