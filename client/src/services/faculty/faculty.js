import gql from "graphql-tag";
import { client } from "../../client";
import { fields as degreeFields } from "./degree";
import { fields as extensionWorkFields } from "./extension_work";
import { fields as instructionalMaterialFields } from "./instructional_material";
import { fields as presentationFields } from "./presentation";
import { fields as recognitionFields } from "./recognition";


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
const fullFacultyDetails = [
    facultySummary,
    facultyOverview,
    degrees,
    recognitions,
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

export function fetchFacultyDetails(_id) {
    return client.query({
        query: gql`
            query($_id: ID!) {
                faculty(_id: $_id) {
                    ${fullFacultyDetails}
                }
            }
        `,
        variables: {
            _id,
        },
    });
}

export function addFaculty(newFaculty, newUser, temporaryPassword) {
    return client.mutate({
        mutation: gql`
            mutation createFaculty($newFaculty: FacultyInput!, $newUser: UserInput!, $temporaryPassword: String!) {
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
}

export function updateFaculty(_id, newFaculty, newUser) {
    return client.mutate({
        mutation: gql`
            mutation updateFaculty($_id: ID!, $newFaculty: FacultyInput!, $newUser: UserInput) {
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
}