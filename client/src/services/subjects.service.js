import gql from "graphql-tag";
import { client } from "../client";


const subjectFields = `
    _id
    code
    name
    description
    category
    faculties
`;

export function fetchAllSubjects() {
    return client.query({
        query: gql`
            query {
                subjects {
                    ${subjectFields}
                }
            }
        `,
    });
}

export function addSubject(newSubject) {
    return client.mutate({
        mutation: gql`
            mutation addSubject($newSubject: SubjectInput!) {
                subject {
                    add(newSubject: $newSubject) {
                        ${subjectFields}
                    }
                }
            }
        `,
        variables: {
            newSubject,
        },
    });
}

export function updateSubject(_id, newSubject) {
    return client.mutate({
        mutation: gql`
            mutation updateSubject($_id: ID!, $newSubject: SubjectInput!) {
                subject {
                    update(_id: $_id, newSubject: $newSubject) {
                        ${subjectFields}
                    }
                }
            }
        `,
        variables: {
            _id,
            newSubject,
        },
    });
}