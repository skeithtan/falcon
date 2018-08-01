import gql from "graphql-tag";
import { client } from "../../client";

export const fields = `
    faculty
    availability {
        M_TH
        T_F
    } 
    feedback {
        submitted
        status
        rejectionReason
        isDirty
    }
`;

export const addFacultiesToTerm = (termScheduleId, faculties) =>
    client.mutate({
        mutation: gql`
    mutation($termScheduleId: ID!, $faculties: [ID!]!) {
        termSchedule(_id: $termScheduleId) {
            faculties {
                add(faculties: $faculties) {
                    ${fields}
                }
            }
        }
    }
    `,
        variables: {
            termScheduleId,
            faculties,
        },
    });

export const removeFacultyFromTerm = (termScheduleId, facultyId) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $facultyId: ID!) {
                termSchedule(_id: $termScheduleId) {
                    faculties {
                        remove(_id: $facultyId)
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
            facultyId,
        },
    });
