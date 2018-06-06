import gql from "graphql-tag";
import { client } from "../../client";


export const fields = `
    _id
    code
    name
`;

export const fetchTeachingSubjects = facultyId => client.query({
    query: gql`
        query($_id: ID!) {
            faculty(_id: $_id) {
                _id
                teachingSubjects {
                    ${fields}
                }
            }
        }
    `,
    variables: {
        _id: facultyId,
    },
});

export const unassignFacultyFromSubject = (facultyId, subjectId) => client.mutate({
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
