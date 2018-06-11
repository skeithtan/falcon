import gql from "graphql-tag";
import { client } from "../../client";


export const fields = `
    _id
    code
    name
`;

export const setTeachingSubjects = (facultyId, teachingSubjectsId) => client.mutate({
    mutation: gql`
        mutation setTeachingSubjects($facultyId: ID!, $teachingSubjectsId: [ID!]!) {
            teachingSubject(facultyId: $facultyId) {
                set(teachingSubjectsId: $teachingSubjectsId)
            }
        }
    `,
    variables: {
        facultyId,
        teachingSubjectsId,
    },
});

export function unassignFacultyFromSubject(facultyId, subjectId) {
    return client.mutate({
        mutation: gql`
            mutation unassignTeachingSubject($facultyId: ID!, $subjectId: ID!) {
                teachingSubject(facultyId: $facultyId) {
                    unassign(teachingSubjectId: $subjectId)
                }
            }
        `,
        variables: {
            facultyId,
            subjectId,
        },
    });
}
